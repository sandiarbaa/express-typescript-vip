import { defineConfig } from 'eslint-define-config'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'

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
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-require-imports': 'error'
    }
  },
  // Jika Anda ingin menambahkan konfigurasi lain, lakukan di sini
  {
    // Contoh tambahan konfigurasi
    files: ['*.ts', '*.tsx'],
    rules: {
      // Tambahkan aturan tambahan jika diperlukan
    }
  }
])
