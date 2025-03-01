import { test, TestContext } from 'node:test'
import { validatePrefixes } from '../../src/lib/validate-prefixes'

test('validatePrefixes is skipped if no prefixes are passed', (t: TestContext) => {
  t.plan(1)
  const pullRequest = {
    title: 'chore: Update'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'prefixes')
      return ''
    },
    setFailed: (message: string): void => {
      t.assert.fail(message)
    }
  }

  validatePrefixes(pullRequest, core)
})

test('validatePrefixes should pass valid title', (t: TestContext) => {
  t.plan(1)
  const pullRequest = {
    title: 'chore: Update'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'prefixes')
      return 'chore:'
    },
    setFailed: (message: string): void => {
      t.assert.fail(message)
    }
  }

  validatePrefixes(pullRequest, core)
})

test('validatePrefixes should call setFailed on invalid title', (t: TestContext) => {
  t.plan(2)
  const pullRequest = {
    title: 'fix: bug in parser'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'prefixes')
      return 'chore:'
    },
    setFailed: (message: string): void => {
      t.assert.deepStrictEqual(message, 'Pull Request title "fix: bug in parser" did not matched with a prefix - "chore:"')
    }
  }

  validatePrefixes(pullRequest, core)
})
