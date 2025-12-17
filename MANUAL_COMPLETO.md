# 📚 Manual Completo - AdmissionPrep Platform

## Índice

1. [Visão Geral](#visão-geral)
2. [Acesso à Plataforma](#acesso-à-plataforma)
3. [Funcionalidades para Estudantes](#funcionalidades-para-estudantes)
4. [Funcionalidades Administrativas](#funcionalidades-administrativas)
5. [Guia de Importação de Exames](#guia-de-importação-de-exames)
6. [Gestão de Conteúdo](#gestão-de-conteúdo)
7. [Manutenção e Troubleshooting](#manutenção-e-troubleshooting)
8. [Arquitetura Técnica](#arquitetura-técnica)

---

## Visão Geral

### O que é o AdmissionPrep?

AdmissionPrep é uma plataforma completa de preparação para exames de admissão universitária em Moçambique, focada nas universidades UEM (Universidade Eduardo Mondlane) e UP (Universidade Pedagógica).

### Características Principais

- ✅ **Banco de Questões**: Milhares de questões de exames anteriores
- ✅ **Simulados Personalizados**: Configure simulados por disciplina, universidade e número de questões
- ✅ **Modos de Estudo**: Estudo livre, desafios cronometrados e simulados completos
- ✅ **Renderização LaTeX**: Suporte completo para fórmulas matemáticas
- ✅ **Sistema de Ranking**: Competição saudável entre estudantes
- ✅ **Grupos de Estudo**: Colaboração e discussão entre alunos
- ✅ **Painel Administrativo**: Gestão completa de conteúdo
- ✅ **PWA**: Funciona offline e pode ser instalado como app

### Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Backend**: Firebase (Firestore, Authentication, Hosting, Functions)
- **Estilo**: Tailwind CSS
- **Matemática**: KaTeX para renderização LaTeX
- **Estado**: Zustand

---

## Acesso à Plataforma

### URLs

- **Produção**: https://admission-platform-610ce.web.app
- **Desenvolvimento**: http://localhost:5173

### Tipos de Usuário

#### 1. **Usuário Normal (Estudante)**
- Acesso a todas as funcionalidades de estudo
- Pode ser **Free** ou **Premium**

#### 2. **Administrador**
- Acesso total ao painel administrativo
- Gestão de conteúdo, usuários e configurações

### Registro e Login

#### Criar Conta
1. Acesse a página inicial
2. Clique em **"Criar Conta"**
3. Preencha:
   - **Nome**: Seu nome completo (mínimo 3 caracteres)
   - **Email**: Email válido
   - **Senha**: Mínimo 6 caracteres
4. Clique em **"CRIAR CONTA"**
5. Você será redirecionado para a página de disciplinas

#### Fazer Login
1. Acesse a página de login
2. Digite seu email e senha
3. Clique em **"ENTRAR"**

#### Recuperar Senha
1. Na página de login, clique em **"Esqueceu a senha?"**
2. Digite seu email
3. Verifique sua caixa de entrada
4. Siga as instruções do email

---

## Funcionalidades para Estudantes

### 1. Navegação por Disciplinas

#### Acessar Disciplinas
- **Menu**: Disciplinas
- **Filtro**: Selecione UEM ou UP
- **Visualização**: Cards com nome e número de exames

#### Disciplinas Disponíveis
- Matemática
- Física
- Química
- Biologia
- Português
- História
- Geografia
- Inglês

### 2. Exames por Disciplina

#### Visualizar Exames
1. Clique em uma disciplina
2. Veja a lista de exames disponíveis
3. Informações exibidas:
   - Nome do exame
   - Ano
   - Época
   - Número de questões
   - Universidade

#### Fazer um Exame
1. Clique em **"Fazer Exame"**
2. Escolha o modo:
   - **Estudo**: Sem limite de tempo, veja respostas
   - **Desafio**: Cronometrado, competitivo

### 3. Modos de Estudo

#### Modo Estudo
- **Características**:
  - Sem limite de tempo
  - Pode revisar respostas
  - Explicações disponíveis
  - Ideal para aprendizado

- **Como usar**:
  1. Selecione uma questão
  2. Escolha sua resposta
  3. Veja se acertou
  4. Leia a explicação
  5. Continue para próxima questão

#### Modo Desafio
- **Características**:
  - Tempo limitado
  - Pontuação competitiva
  - Entra no ranking
  - Pressão realista de exame

- **Como usar**:
  1. Aceite o desafio
  2. Responda todas as questões
  3. Tempo conta regressivamente
  4. Ao finalizar, veja seu desempenho
  5. Compare com outros estudantes

### 4. Simulados

#### Configurar Simulado
1. Acesse **"Simulados"** no menu
2. Configure:
   - **Disciplina**: Escolha uma ou várias
   - **Universidade**: UEM, UP ou ambas
   - **Número de Questões**: 10, 20, 30 ou 50
   - **Modo**: Estudo ou Desafio

3. Clique em **"Iniciar Simulado"**

#### Durante o Simulado
- Navegue entre questões
- Marque suas respostas
- Veja tempo restante (modo desafio)
- Finalize quando pronto

#### Resultados
- **Pontuação**: Percentual de acertos
- **Tempo gasto**: Duração total
- **Análise**: Questões certas/erradas
- **Comparação**: Seu desempenho vs média

### 5. Ranking

#### Visualizar Ranking
1. Acesse **"Ranking"** no menu
2. Filtros disponíveis:
   - **Universidade**: UEM, UP ou Geral
   - **Disciplina**: Específica ou Geral

#### Informações Exibidas
- Posição no ranking
- Nome do estudante
- Pontuação total
- Badge Premium (⭐)

#### Como Subir no Ranking
- Complete desafios
- Acerte mais questões
- Seja mais rápido
- Estude regularmente

### 6. Grupos de Estudo

#### Entrar em um Grupo
1. Acesse **"Grupos"** no menu
2. Navegue pelos grupos disponíveis
3. Clique em **"Entrar no Grupo"**

#### Participar de Discussões
1. Entre em um grupo
2. Acesse o chat
3. Envie mensagens
4. Interaja com outros membros

#### Criar um Grupo (Premium)
- Funcionalidade exclusiva para usuários Premium
- Entre em contato com administrador

### 7. Perfil do Usuário

#### Visualizar Perfil
1. Clique no seu nome (canto superior direito)
2. Selecione **"Perfil"**

#### Informações do Perfil
- Nome
- Email
- Status Premium
- Estatísticas:
  - Total de pontos
  - Sequência de dias
  - Exames completados
  - Taxa de acerto

#### Editar Perfil
- Atualizar nome
- Trocar senha
- Configurar preferências

### 8. Histórico

#### Acessar Histórico
1. Menu → **"Histórico"**
2. Veja todos os exames/simulados realizados

#### Informações Exibidas
- Data e hora
- Tipo (Estudo/Desafio/Simulado)
- Disciplina
- Pontuação
- Tempo gasto

#### Revisar Exame Anterior
1. Clique em um exame do histórico
2. Revise suas respostas
3. Veja explicações
4. Identifique pontos de melhoria

---

## Funcionalidades Administrativas

### Acesso ao Painel Admin

#### Login como Admin
1. Faça login com conta de administrador
2. Acesse **"/admin"** na URL
3. Ou clique em **"Admin"** no menu (se visível)

### Dashboard Administrativo

#### Visão Geral
- **Total de Usuários**: Quantidade total registrada
- **Usuários Premium**: Quantidade de assinantes
- **Total de Exames**: Exames cadastrados
- **Novos Usuários**: Últimos 30 dias

#### Ações Rápidas
- Gerenciar Exames
- Gerenciar Usuários
- Gerenciar Disciplinas
- Gerenciar Grupos
- Importação em Massa

### Gestão de Exames

#### Listar Exames
1. Admin → **"Gerenciar Exames"**
2. Veja todos os exames cadastrados
3. Filtros:
   - Por disciplina
   - Por universidade
   - Por ano

#### Criar Novo Exame
1. Clique em **"Novo Exame"**
2. Preencha:
   - **Nome**: Ex: "Exame 2024 - 1ª Época"
   - **Disciplina**: Selecione da lista
   - **Universidade**: UEM ou UP (derivada da disciplina)
   - **Ano**: 2024
   - **Época**: 1ª época, 2ª época, etc.
   - **Descrição**: Opcional

3. Clique em **"Criar Exame"**

#### Editar Exame
1. Na lista de exames, clique em **"Editar"**
2. Modifique os campos desejados
3. Clique em **"Salvar"**

#### Adicionar Questões a um Exame
1. Entre no modo de edição do exame
2. Clique em **"Adicionar Questão"**
3. Preencha:
   - **Enunciado**: Texto da questão (suporta LaTeX)
   - **Opções**: A, B, C, D (e opcionalmente E)
   - **Resposta Correta**: Selecione a letra
   - **Explicação**: Resolução detalhada (opcional)

4. Preview em tempo real do LaTeX
5. Clique em **"Salvar Questão"**

#### Editar Questões
1. Na lista de questões do exame
2. Clique em **"Editar"** na questão
3. Modifique conforme necessário
4. Preview atualiza em tempo real
5. Salve as alterações

#### Reordenar Questões
1. Use os botões de seta para cima/baixo
2. Ou arraste e solte (se implementado)
3. A ordem é salva automaticamente

#### Excluir Exame
1. Na lista de exames, clique em **"Excluir"**
2. Confirme a ação
3. ⚠️ **Atenção**: Isso excluirá todas as questões associadas

### Importação em Massa (JSON)

#### Visão Geral
A importação em massa permite cadastrar múltiplas questões de uma vez usando JSON gerado pelo Gemini.

#### Passo 1: Preparar Dados do Exame
1. Acesse **Admin → Importação em Massa**
2. Preencha:
   - **Nome do Exame**: Ex: "Matemática 2024 - 1ª Época"
   - **Universidade**: UEM ou UP
   - **Disciplina**: Selecione da lista filtrada
   - **Ano**: 2024
   - **Época**: 1ª época

#### Passo 2: Gerar JSON com Gemini
1. Clique em **"Copiar Prompt"**
2. Abra o [Gemini](https://gemini.google.com)
3. Cole o prompt copiado
4. **Anexe as imagens**:
   - Foto do exame (questões)
   - Foto do gabarito (respostas)

5. Envie para o Gemini
6. Aguarde a geração do JSON

#### Passo 3: Colar JSON
1. Copie o JSON gerado pelo Gemini
2. Cole no campo **"Cole o JSON Aqui"**
3. Clique em **"Carregar Questões"**

#### Passo 4: Revisar Questões
1. Revise cada questão carregada
2. **Edite** se necessário:
   - Enunciado
   - Opções
   - Resposta correta
   - Explicação

3. **Preview LaTeX**: Veja como ficará renderizado
4. **Adicionar Manualmente**: Clique em "+" para nova questão
5. **Remover**: Clique no ícone de lixeira

#### Passo 5: Finalizar Importação
1. Revise todas as questões
2. Clique em **"Finalizar Importação"**
3. Aguarde o processamento
4. Você será redirecionado para edição do exame

#### Formato do JSON

```json
[
  {
    "statement": "Qual o valor de $\\frac{1}{2} + \\frac{1}{3}$?",
    "options": [
      "$\\frac{5}{6}$",
      "$\\frac{2}{5}$",
      "$\\frac{3}{5}$",
      "$1$"
    ],
    "correctOption": "A",
    "explanation": "Somando as frações: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3+2}{6} = \\frac{5}{6}$"
  }
]
```

#### Dicas para LaTeX no JSON

✅ **Aceita ambos os formatos**:
- Normal: `\sin`, `\pi`, `\frac{a}{b}`
- Escapado: `\\sin`, `\\pi`, `\\frac{a}{b}`

O sistema converte automaticamente!

#### Solução de Problemas na Importação

**Erro: "JSON inválido"**
- Verifique se começa com `[` e termina com `]`
- Certifique-se que todas as aspas estão fechadas
- Remova vírgulas extras no final

**Erro: "Questão incompleta"**
- Todas as questões precisam ter:
  - `statement` (enunciado)
  - `options` (array com 4+ opções)
  - `correctOption` (letra da resposta)

**LaTeX não renderiza**
- Verifique a sintaxe LaTeX
- Use `$...$` para inline math
- Use `$$...$$` para display math

### Gestão de Usuários

#### Listar Usuários
1. Admin → **"Gerenciar Usuários"**
2. Veja todos os usuários cadastrados
3. Informações:
   - Nome
   - Email
   - Tipo (Admin/Normal)
   - Status Premium
   - Data de registro

#### Promover a Premium
1. Encontre o usuário
2. Clique em **"Promover a Premium"**
3. Confirme a ação
4. Usuário ganha acesso premium

#### Remover Premium
1. Encontre o usuário premium
2. Clique em **"Remover Premium"**
3. Confirme a ação

#### Criar Admin
1. Clique em **"Criar Admin"**
2. Preencha:
   - Nome
   - Email
   - Senha

3. Novo admin é criado

#### Editar Usuário
1. Clique em **"Editar"**
2. Modifique informações
3. Salve

#### Excluir Usuário
1. Clique em **"Excluir"**
2. Confirme a ação
3. ⚠️ **Atenção**: Dados do usuário serão perdidos

### Gestão de Disciplinas

#### Listar Disciplinas
1. Admin → **"Gerenciar Disciplinas"**
2. Veja todas as disciplinas

#### Criar Nova Disciplina
1. Clique em **"Nova Disciplina"**
2. Preencha:
   - **Título**: Nome da disciplina
   - **Universidade**: UEM ou UP
   - **Descrição**: Opcional

3. Clique em **"Criar"**

#### Editar Disciplina
1. Clique em **"Editar"**
2. Modifique campos
3. Salve

#### Excluir Disciplina
1. Clique em **"Excluir"**
2. Confirme
3. ⚠️ **Atenção**: Exames associados podem ficar órfãos

### Gestão de Grupos

#### Listar Grupos
1. Admin → **"Gerenciar Grupos"**
2. Veja todos os grupos de estudo

#### Criar Novo Grupo
1. Clique em **"Novo Grupo"**
2. Preencha:
   - **Nome**: Nome do grupo
   - **Descrição**: Objetivo do grupo
   - **Universidade**: UEM, UP ou Ambas
   - **Disciplina**: Opcional

3. Clique em **"Criar Grupo"**

#### Editar Grupo
1. Clique em **"Editar"**
2. Modifique informações
3. Salve

#### Excluir Grupo
1. Clique em **"Excluir"**
2. Confirme
3. ⚠️ **Atenção**: Mensagens do chat serão perdidas

### Testes A/B (Avançado)

#### O que são Testes A/B?
Permite testar diferentes versões de mensagens/telas para otimizar conversão.

#### Criar Teste A/B
1. Admin → **"Testes A/B"**
2. Clique em **"Novo Teste"**
3. Configure:
   - **Nome**: Identificador do teste
   - **Localização**: Onde aparece (ex: tela de limite de desafios)
   - **Variante A**: Primeira versão
   - **Variante B**: Segunda versão
   - **Distribuição**: % de usuários para cada variante

4. Ative o teste

#### Analisar Resultados
1. Veja métricas:
   - Visualizações
   - Cliques
   - Taxa de conversão

2. Determine qual variante performa melhor
3. Implemente a vencedora

---

## Guia de Importação de Exames

### Fluxo Completo: Do PDF ao Sistema

#### 1. Preparação
**Materiais necessários**:
- PDF ou fotos do exame
- Gabarito oficial (se disponível)
- Acesso ao Gemini
- Acesso admin na plataforma

#### 2. Captura de Imagens
1. Se tiver PDF:
   - Tire screenshots de cada página
   - Ou converta PDF para imagens

2. Se tiver físico:
   - Fotografe cada página
   - Garanta boa iluminação
   - Evite sombras e reflexos

#### 3. Organização
1. Separe as imagens:
   - Questões (todas as páginas)
   - Gabarito (página de respostas)

2. Nomeie os arquivos:
   - `exame_matematica_2024_p1.jpg`
   - `exame_matematica_2024_p2.jpg`
   - `gabarito_matematica_2024.jpg`

#### 4. Geração do JSON com Gemini

**Passo a passo**:
1. Acesse https://gemini.google.com
2. Copie o prompt da plataforma (botão "Copiar Prompt")
3. Cole no Gemini
4. **Anexe as imagens** (questões + gabarito)
5. Envie
6. Aguarde o Gemini processar (pode levar 1-2 minutos)
7. Copie o JSON gerado

**Exemplo de prompt**:
```
Atue como um especialista em OCR e estruturação de dados.
Analise as imagens fornecidas e extraia as questões deste exame de admissão.
Retorne um JSON válido (array de objetos) seguindo EXATAMENTE este formato:
[...]
```

#### 5. Importação na Plataforma
1. Admin → Importação em Massa
2. Preencha dados do exame
3. Cole o JSON
4. Clique em "Carregar Questões"

#### 6. Revisão e Correção
1. **Revise TODAS as questões**:
   - Enunciados completos?
   - Opções corretas?
   - Resposta certa marcada?
   - LaTeX renderizando bem?

2. **Correções comuns**:
   - Fórmulas matemáticas
   - Acentuação
   - Símbolos especiais
   - Ordem das opções

3. **Use o Preview**:
   - Veja como ficará para o estudante
   - Teste a renderização LaTeX

#### 7. Finalização
1. Clique em "Finalizar Importação"
2. Aguarde processamento
3. Verifique se o exame aparece na lista

#### 8. Teste
1. Faça logout do admin
2. Entre como estudante
3. Tente fazer o exame
4. Verifique se tudo funciona

### Boas Práticas

#### Qualidade das Imagens
✅ **Faça**:
- Use boa iluminação
- Mantenha câmera estável
- Capture texto legível
- Inclua toda a questão

❌ **Evite**:
- Imagens borradas
- Sombras sobre o texto
- Cortes que removem partes da questão
- Reflexos de luz

#### Organização
✅ **Faça**:
- Nomeie arquivos claramente
- Mantenha ordem das questões
- Separe por disciplina/ano
- Guarde originais

❌ **Evite**:
- Misturar exames diferentes
- Perder ordem das questões
- Deletar originais antes de confirmar

#### Revisão
✅ **Faça**:
- Revise TODAS as questões
- Compare com original
- Teste LaTeX
- Verifique gabarito

❌ **Evite**:
- Importar sem revisar
- Confiar 100% no OCR
- Pular verificação de LaTeX

### Troubleshooting Comum

#### Gemini não gera JSON correto
**Soluções**:
1. Melhore qualidade das imagens
2. Divida em lotes menores (10-15 questões)
3. Seja mais específico no prompt
4. Tente novamente

#### LaTeX não renderiza
**Causas comuns**:
- Sintaxe incorreta: `\frac{a}{b}` vs `\frac{a}b}`
- Falta de delimitadores: `$...$`
- Caracteres especiais não escapados

**Solução**:
- Revise sintaxe LaTeX
- Use preview para testar
- Consulte documentação KaTeX

#### Questões incompletas
**Causas**:
- OCR falhou em parte do texto
- Imagem cortada
- Texto ilegível

**Solução**:
- Complete manualmente
- Recapture imagem
- Digite texto faltante

---

## Gestão de Conteúdo

### Estratégia de Conteúdo

#### Planejamento
1. **Defina prioridades**:
   - Quais disciplinas primeiro?
   - Quais anos são mais relevantes?
   - Qual universidade tem mais demanda?

2. **Crie cronograma**:
   - Meta: X exames por semana
   - Responsáveis por disciplina
   - Prazos de revisão

#### Coleta de Material
1. **Fontes**:
   - Exames oficiais das universidades
   - Provas anteriores
   - Material didático autorizado

2. **Organização**:
   - Pasta por disciplina
   - Subpasta por ano
   - Arquivo por época

#### Qualidade
1. **Critérios**:
   - Questões completas
   - Gabarito verificado
   - LaTeX correto
   - Explicações claras

2. **Revisão**:
   - Dupla verificação
   - Teste por estudante
   - Feedback incorporado

### Manutenção Regular

#### Tarefas Semanais
- [ ] Adicionar novos exames
- [ ] Revisar questões reportadas
- [ ] Verificar feedback de usuários
- [ ] Atualizar estatísticas

#### Tarefas Mensais
- [ ] Análise de uso
- [ ] Limpeza de dados duplicados
- [ ] Backup do banco de dados
- [ ] Atualização de conteúdo

#### Tarefas Trimestrais
- [ ] Revisão completa de qualidade
- [ ] Atualização de disciplinas
- [ ] Análise de performance
- [ ] Planejamento de novos recursos

---

## Manutenção e Troubleshooting

### Problemas Comuns e Soluções

#### Usuários não conseguem fazer login
**Diagnóstico**:
1. Verifique Firebase Authentication
2. Confira console de erros
3. Teste com conta de teste

**Soluções**:
- Verificar configuração Firebase
- Limpar cache do navegador
- Resetar senha do usuário

#### Questões não carregam
**Diagnóstico**:
1. Verifique Firestore
2. Confira regras de segurança
3. Veja console de erros

**Soluções**:
- Verificar índices do Firestore
- Atualizar regras de segurança
- Reindexar coleções

#### LaTeX não renderiza
**Diagnóstico**:
1. Verifique sintaxe LaTeX
2. Confira importação KaTeX
3. Veja console de erros

**Soluções**:
- Corrigir sintaxe LaTeX
- Verificar CDN do KaTeX
- Limpar cache

#### Performance lenta
**Diagnóstico**:
1. Verifique tamanho do bundle
2. Analise queries do Firestore
3. Confira cache

**Soluções**:
- Otimizar bundle (code splitting)
- Adicionar índices no Firestore
- Implementar cache agressivo
- Lazy loading de componentes

### Backup e Recuperação

#### Backup do Firestore
```bash
# Exportar dados
gcloud firestore export gs://[BUCKET_NAME]

# Importar dados
gcloud firestore import gs://[BUCKET_NAME]/[EXPORT_FOLDER]
```

#### Backup Local
1. Firebase Console → Firestore
2. Export data
3. Salve em local seguro
4. Agende backups automáticos

#### Recuperação de Dados
1. Identifique ponto de restauração
2. Importe backup
3. Verifique integridade
4. Teste funcionalidades

### Monitoramento

#### Firebase Console
1. **Performance**:
   - Tempo de carregamento
   - Erros de rede
   - Crashes

2. **Analytics**:
   - Usuários ativos
   - Páginas mais visitadas
   - Taxa de conversão

3. **Firestore**:
   - Leituras/escritas
   - Uso de armazenamento
   - Custos

#### Alertas
Configure alertas para:
- Picos de erro
- Uso excessivo de recursos
- Falhas de autenticação
- Performance degradada

---

## Arquitetura Técnica

### Estrutura do Projeto

```
admission-platform/
├── public/              # Arquivos estáticos
│   ├── icon-192.png    # Ícone PWA
│   ├── icon-512.png    # Ícone PWA
│   ├── manifest.json   # Manifest PWA
│   └── sw.js          # Service Worker
├── src/
│   ├── components/     # Componentes React
│   │   ├── Layout.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   ├── hooks/         # Custom hooks
│   │   ├── useNotifications.ts
│   │   └── ...
│   ├── lib/           # Configurações
│   │   └── firebase.ts
│   ├── pages/         # Páginas da aplicação
│   │   ├── admin/    # Páginas admin
│   │   └── ...
│   ├── services/      # Serviços
│   │   ├── dbService.ts
│   │   ├── authService.ts
│   │   └── ...
│   ├── stores/        # Estado global (Zustand)
│   │   ├── useAuthStore.ts
│   │   └── useContentStore.ts
│   ├── types/         # TypeScript types
│   │   ├── exam.ts
│   │   ├── user.ts
│   │   └── ...
│   ├── utils/         # Utilitários
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Entry point
├── functions/         # Cloud Functions
│   └── src/
│       └── index.ts
├── firebase.json      # Config Firebase
├── firestore.rules    # Regras de segurança
├── firestore.indexes.json  # Índices
└── package.json       # Dependências
```

### Banco de Dados (Firestore)

#### Coleções Principais

**users**
```typescript
{
  uid: string;
  displayName: string;
  email: string;
  role: 'admin' | 'user';
  isPremium: boolean;
  points: number;
  streak: number;
  createdAt: Timestamp;
  studyPlan?: StudyPlan;
}
```

**disciplines**
```typescript
{
  id: string;
  title: string;
  university: 'UEM' | 'UP';
  description?: string;
  examsCount: number;
}
```

**exams**
```typescript
{
  id: string;
  name: string;
  disciplineId: string;
  university: 'UEM' | 'UP';
  year: number;
  season: string;
  questionsCount: number;
  description?: string;
  createdAt: Timestamp;
}
```

**questions**
```typescript
{
  id: string;
  examId: string;
  disciplineId: string;
  statement: string;
  options: string[];
  correctOption: string;
  explanation?: string;
  order: number;
}
```

**groups**
```typescript
{
  id: string;
  name: string;
  description: string;
  university: 'UEM' | 'UP' | 'Ambas';
  disciplineId?: string;
  members: string[];
  createdAt: Timestamp;
}
```

**messages**
```typescript
{
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Timestamp;
}
```

#### Índices Compostos
Definidos em `firestore.indexes.json`:
- `questions`: (examId, order)
- `messages`: (groupId, timestamp)
- `exams`: (disciplineId, year)

### Regras de Segurança

#### Firestore Rules
```javascript
// Usuários podem ler seus próprios dados
match /users/{userId} {
  allow read: if request.auth.uid == userId;
  allow write: if request.auth.uid == userId;
}

// Admins podem ler/escrever tudo
match /{document=**} {
  allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}

// Questões são públicas para leitura
match /questions/{questionId} {
  allow read: if request.auth != null;
}
```

### Autenticação

#### Firebase Authentication
- **Email/Password**: Método principal
- **Verificação**: Email verification opcional
- **Recuperação**: Password reset via email

#### Fluxo de Autenticação
1. Usuário faz login
2. Firebase retorna token
3. Token armazenado no Zustand
4. Token enviado em todas as requisições
5. Firestore valida via rules

### Estado Global (Zustand)

#### useAuthStore
```typescript
{
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}
```

#### useContentStore
```typescript
{
  disciplines: Discipline[];
  exams: Exam[];
  loading: boolean;
  fetchDisciplines: () => Promise<void>;
  fetchExams: (disciplineId: string) => Promise<void>;
}
```

### Roteamento

#### React Router
```typescript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  
  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/disciplines" element={<DisciplinesPage />} />
    <Route path="/exams/:id" element={<ExamPage />} />
    {/* ... */}
  </Route>
  
  {/* Admin Routes */}
  <Route element={<AdminRoute />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/exams" element={<AdminExamsPage />} />
    {/* ... */}
  </Route>
</Routes>
```

### Build e Deploy

#### Desenvolvimento
```bash
npm run dev
```

#### Build de Produção
```bash
npm run build
```

#### Deploy Firebase
```bash
# Hosting apenas
firebase deploy --only hosting

# Tudo (hosting + functions + firestore)
firebase deploy
```

### Performance

#### Otimizações Implementadas
- ✅ Code splitting por rota
- ✅ Lazy loading de componentes
- ✅ Memoização com React.memo
- ✅ Debounce em buscas
- ✅ Paginação de listas
- ✅ Cache de queries Firestore

#### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

### PWA (Progressive Web App)

#### Características
- ✅ Instalável
- ✅ Funciona offline
- ✅ Ícones personalizados
- ✅ Service Worker

#### Manifest
```json
{
  "name": "AdmissionPrep",
  "short_name": "AdmissionPrep",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6CC24A",
  "background_color": "#ffffff",
  "icons": [...]
}
```

---

## Apêndice

### Glossário

- **LaTeX**: Linguagem de marcação para fórmulas matemáticas
- **KaTeX**: Biblioteca para renderizar LaTeX
- **Firestore**: Banco de dados NoSQL do Firebase
- **PWA**: Progressive Web App
- **Bundle**: Arquivo JavaScript compilado
- **Zustand**: Biblioteca de gerenciamento de estado

### Recursos Úteis

#### Documentação
- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [KaTeX Docs](https://katex.org)
- [Tailwind CSS](https://tailwindcss.com)

#### Ferramentas
- [Gemini](https://gemini.google.com) - Para OCR
- [Firebase Console](https://console.firebase.google.com)
- [VS Code](https://code.visualstudio.com) - Editor recomendado

### Suporte

#### Contato
- **Email**: [seu-email]
- **GitHub**: [repositório]
- **Documentação**: Este manual

#### Reportar Problemas
1. Descreva o problema
2. Passos para reproduzir
3. Screenshots se possível
4. Informações do navegador

---

## Changelog

### Versão 1.0.0 (Dezembro 2024)
- ✅ Sistema de autenticação
- ✅ Gestão de exames e questões
- ✅ Modos de estudo (Estudo, Desafio, Simulado)
- ✅ Importação em massa via JSON
- ✅ Auto-conversão de LaTeX
- ✅ Preview de LaTeX em tempo real
- ✅ Sistema de ranking
- ✅ Grupos de estudo
- ✅ Painel administrativo completo
- ✅ PWA com suporte offline
- ✅ Deploy em produção

---

**Última atualização**: 17 de Dezembro de 2024
**Versão do Manual**: 1.0.0
