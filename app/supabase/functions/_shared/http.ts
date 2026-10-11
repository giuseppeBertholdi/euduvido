/** Utilitários HTTP das Edge Functions. */
export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/** Erro com status HTTP e um código estável que o app traduz. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}

export function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

/** CORS, só POST, corpo JSON e erros uniformes ({ error: código }). Toda resposta leva `serverNow`. */
export function serveJson(handler: (req: Request, body: Record<string, unknown>) => Promise<Record<string, unknown>>): (req: Request) => Promise<Response> {
  return async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    try {
      if (req.method !== 'POST') throw new HttpError(405, 'method_not_allowed');
      let body: unknown;
      try {
        body = await req.json();
      } catch {
        throw new HttpError(400, 'invalid_json');
      }
      if (!body || typeof body !== 'object') throw new HttpError(400, 'invalid_body');
      return json(200, { ...(await handler(req, body as Record<string, unknown>)), serverNow: Date.now() });
    } catch (error) {
      if (error instanceof HttpError) return json(error.status, { error: error.code, serverNow: Date.now() });
      console.error('unhandled error', error);
      return json(500, { error: 'internal_error', serverNow: Date.now() });
    }
  };
}
