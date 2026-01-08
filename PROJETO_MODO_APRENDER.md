# Projeto Estrutural: Modo Aprender (LumoEdu) - 2.0

## 📐 Fluxograma do Estudante (Student Journey)

Visualização da estrutura implementada (Estilo Duolingo):

```mermaid
graph TD
    A[🧑‍🎓 Aluno] -->|Login| B{Tela Principal: /learning}
    
    subgraph "Nível 1: Disciplinas"
        B -->|Escolhe| C[📘 Matemática<br/>(Barra de Progresso: 30%)]
        B -->|Escolhe| D[📕 Português<br/>(Barra de Progresso: 0%)]
    end
    
    C -->|Entra| E{Trilha de Aprendizado: /practice/matematica}
    
    subgraph "Nível 2: Seções (Units)"
        E -->|Visualiza| F[📍 Seção 1: Fundamentos<br/>(Header Fixo Verde)]
        E -->|Scroll| G[📍 Seção 2: Álgebra<br/>(Abaixo da dobra)]
    end
    
    subgraph "Nível 3: Etapas (Snake Map)"
        F --> H((⭐ Etapa 1<br/>Concluída))
        H --> I((⭐ Etapa 2<br/>Disponível + Mascote))
        I -->|Bloqueado| J((🔒 Etapa 3))
    end
    
    I -->|Clicar| K[🎮 Quiz / Lição<br/>(5-10 min)]
    
    subgraph "Nível 4: Ação e Feedback"
        K --> L{Acertou?}
        L -->|Sim| M[✅ Feedback Positivo + XP]
        L -->|Não| N[❌ Feedback Corretivo + Explicação]
    end
    
    M --> O[🏆 Tela de Resultado]
    O -->|Retornar| E
    E -->|Desbloqueia| J
```

## 🏗️ Estrutura de Dados (Firebase)

### 1. Disciplinas (`disciplines`)
*   Coleção Raiz.
*   Ex: `matematica`, `portugues`.

### 2. Seções (`disciplines/{id}/sections`)
*   Agrupadores de conteúdo.
*   Campos: `title`, `description`, `order`.
*   Ex: "Fundamentos", "Geometria Plana".

### 3. Sessões/Etapas (`disciplines/{id}/sections/{sid}/steps`)
*   O nó jogável.
*   Campos: `title`, `level`, `xpReward`, `order`.
*   Agora aninhadas dentro de Seções para organização hierárquica clara.

### 4. Questões (`.../steps/{sid}/questions`)
*   O conteúdo real da lição.

## 🎨 Elementos Visuais Implementados

1.  **Header da Seção (Sticky):** Título e cor temática que ficam fixos no topo enquanto o aluno percorre a "cobra" de lições daquela unidade.
2.  **Trilha Sinuosa (Snake):** As lições não são uma lista reta, mas serpenteiam (esquerda/direita) para dar sensação de caminho.
3.  **Cadeado Inteligente:**
    *   **Passado:** Ouro/Colorido (Check).
    *   **Presente:** Pulsante + Mascote (Foco).
    *   **Futuro:** Cinza + Cadeado (Bloqueado).
4.  **Feedback Visual:** Mascote "Lumo" dando apoio na lição atual.

---
**Status:** ✅ Estrutura Admin e Frontend (Trilha) implementada. Próximo passo: Refinar `LearningPage` para mostrar progresso global.
