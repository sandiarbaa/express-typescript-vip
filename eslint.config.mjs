import { defineConfig } from 'eslint-define-config'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import { expression } from 'joi'

export default defineConfig([
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        tsconfigRoot: './',
        project: './tsconfig.json', // Sesuaikan dengan lokasi tsconfig Anda
        sourceType: 'module'
      }
    },
    plugins: {
      typescriptEslint: typescriptEslintPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Mengabaikan variabel yang diawali dengan _
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn', // Menyarankan untuk mendefinisikan tipe return pada fungsi
      'no-unused-vars': 'off' // Mematikan aturan ini karena sudah diatur dengan @typescript-eslint
    }
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      // Tambahkan aturan tambahan jika diperlukan
      // '@typescript-eslint/restrict-template-expression': 'off',
      // '@typescript-eslint/explicit-function-return-type': 'off',
      // '@typescript-eslint/restrict-boolean-expression': 'off'
    }
  }
])
