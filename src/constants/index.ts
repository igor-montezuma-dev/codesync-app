import { Calendar, Clock, Code2, Users } from "lucide-react";

export const INTERVIEW_CATEGORY = [
  { id: "upcoming", title: "Próximas entrevistas", variant: "outline" },
  { id: "completed", title: "Concluída", variant: "secondary" },
  { id: "succeeded", title: "Bem-sucedida", variant: "default" },
  { id: "failed", title: "Fracassada", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "New Call",
    transaltedTitle: "Nova Chamada",
    description: "Iniciar uma chamada instantânea",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Users,
    title: "Join Interview",
    transaltedTitle: "Junte-se à entrevista",
    description: "Entrar através do link de convite",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Schedule",
    transaltedTitle: "Agendar",
    description: "Planeje as próximas entrevistas",
    color: "blue-500",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    icon: Clock,
    title: "Recordings",
    transaltedTitle: "Gravações",
    description: "Acesse entrevistas anteriores",
    color: "orange-500",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
  },
];

export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    id: "two-sum",
    title: "Soma de Dois Números",
    description:
      "Dado um array de números inteiros `nums` e um inteiro `target`, retorne os índices dos dois números no array cuja soma seja igual a `target`.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Porque nums[0] + nums[1] == 9, retornamos [0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Escreva sua solução aqui
}`,
      python: `def two_sum(nums, target):
    # Escreva sua solução aqui
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Escreva sua solução aqui
    }
}`,
      csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Escreva sua solução aqui
    }
}`,
      ruby: `def two_sum(nums, target)
  # Escreva sua solução aqui
end`,
      go: `package main
func TwoSum(nums []int, target int) []int {
  // Escreva sua solução aqui
  return nil
}`
    },
    constraints: [
      "2 ≤ nums.length ≤ 104",
      "-109 ≤ nums[i] ≤ 109",
      "-109 ≤ target ≤ 109",
      "Apenas uma resposta válida existe.",
    ],
  },
  {
    id: "reverse-string",
    title: "Inverter String",
    description:
      "Escreva uma função que inverta uma string. A string de entrada é fornecida como um array de caracteres `s`.",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Escreva sua solução aqui
}`,
      python: `def reverse_string(s):
    # Escreva sua solução aqui
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Escreva sua solução aqui
    }
}`,
      csharp: `public class Solution {
    public void ReverseString(char[] s) {
        // Escreva sua solução aqui
    }
}`,
      ruby: `def reverse_string(s)
  # Escreva sua solução aqui
end`,
      go: `package main
func ReverseString(s []rune) {
  // Escreva sua solução aqui
}`
    },
  },
  {
    id: "palindrome-number",
    title: "Número Palíndromo",
    description:
      "Dado um número inteiro `x`, retorne `true` se `x` for um palíndromo e `false` caso contrário.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 é lido da mesma forma da esquerda para a direita e vice-versa.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "Lendo da esquerda para a direita, temos -121. Da direita para a esquerda, temos 121-. Portanto, não é um palíndromo.",
      },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Escreva sua solução aqui
}`,
      python: `def is_palindrome(x):
    # Escreva sua solução aqui
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Escreva sua solução aqui
    }
}`,
      csharp: `public class Solution {
    public bool IsPalindrome(int x) {
        // Escreva sua solução aqui
    }
}`,
      ruby: `def is_palindrome(x)
  # Escreva sua solução aqui
end`,
      go: `package main
func IsPalindrome(x int) bool {
  // Escreva sua solução aqui
  return false
}`
    },
  },
  {
    id: "factorial",
    title: "Fatorial de um Número",
    description:
      "Dado um número inteiro `n`, retorne o fatorial de `n`.",
    examples: [
      {
        input: "n = 5",
        output: "120",
      },
      {
        input: "n = 3",
        output: "6",
      },
    ],
    starterCode: {
      javascript: `function factorial(n) {
  // Escreva sua solução aqui
}`,
      python: `def factorial(n):
    # Escreva sua solução aqui
    pass`,
      java: `class Solution {
    public int factorial(int n) {
        // Escreva sua solução aqui
    }
}`,
      csharp: "",
      ruby: "",
      go: ""
    }
  }
];



export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "/javascript.png" },
  { id: "python", name: "Python", icon: "/python.png" },
  { id: "java", name: "Java", icon: "/java.png" },
  { id: "csharp", name: "C#", icon: "/csharp.png" },
  { id: "ruby", name: "Ruby", icon: "/ruby.png" },
  { id: "go", name: "Go", icon: "/go.png" },
] as const;


export interface CodeQuestion {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    csharp: string;
    ruby: string;
    go: string;
  };
  constraints?: string[];
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number];