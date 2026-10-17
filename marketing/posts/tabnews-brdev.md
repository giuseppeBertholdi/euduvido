# Post de bastidores (TabNews e r/brdev)

## Título

Lancei meu primeiro app na App Store, impulsionei no TikTok e tive 0 instalações. O que aprendi

## Corpo

Anteontem saiu na App Store o **Eu Duvido!**, um jogo de festa brasileiro. Sai uma pergunta com resposta em número ("quantos km de vasos sanguíneos tem o seu corpo?"), cada um dá um lance que quer dizer "é isso ou mais" e o próximo aumenta ou grita EU DUVIDO. Joga passando um celular na roda ou cada um no seu, em sala com PIN.

Deixo aqui o que funcionou e o que deu errado.

**Stack**
- Expo (React Native) + expo-router
- Supabase: salas com PIN em tempo real, sessão anônima, sem cadastro
- RevenueCat pra assinatura, com o "pro" conferido no servidor
- PostHog pra analytics

**O que aprendi**

1. **A versão em inglês foi rejeitada pela regra 2.3.7** porque eu escrevi "grátis" nas screenshots. A Apple não deixa falar de preço na imagem.
2. **Pergunta boa é a que todo mundo jura que sabe e erra por 100x.** De 708 perguntas, joguei fora 109 que eram "chutáveis". Hoje cada pergunta vem com a fonte, porque a discussão depois da revelação é metade da graça.
3. **Impulsionar no TikTok sem pensar no público é jogar dinheiro fora.** Um vídeo impulsionado fez 8.676 views e 0 instalações. Os números: tempo médio assistido de 1,38 s, 0,8% viu até o fim, 99% do público no Brasil. E o app é só pra iPhone, que é uma fatia pequena dos celulares no Brasil. Quem viu nem tinha como instalar.
4. **O que funcionou de verdade:** carrossel orgânico respondendo a uma busca real ("brincadeiras com amigos"). Num app anterior, um post assim fez 21 mil views, ~95% delas vindas da busca do TikTok.

**Próximos passos:** versão Android e um jeito de jogar sem instalar.

Se tiver iPhone e um grupo de amigos, testa no próximo rolê e me conta onde o jogo trava. Feedback sobre as perguntas é o que mais me ajuda (me manda as que você achou fáceis demais).

https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690

---

### Pra responder nos comentários (primeiras 2 horas)
- "Por que não Android?" → "Comecei pelo iPhone porque era onde eu testava. Android é o próximo, o projeto já é Expo."
- "Quanto custa?" → "O pacote clássico é grátis. O Pro libera os outros pacotes e a sala com PIN, e quem entra na sala não paga."
