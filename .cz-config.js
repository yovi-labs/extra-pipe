module.exports = {
    types: [
      { value: 'feat', name: 'feat:     A new feature' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'docs', name: 'docs:     Documentation only changes' },
      {
        value: 'style',
        name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
      },
      {
        value: 'refactor',
        name: 'refactor: A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     Adding missing tests or correcting existing tests'
      },
      {
        value: 'chore',
        name: 'chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation'
      },
      { value: 'revert', name: 'revert:   Reverts a previous commit' }
    ],
    messages: {
      type: "Select the type of change that you're committing:",
      subject:
        'Write a short, imperative tense description of the change (max 100 characters):',
      body:
        'Provide a longer description of the change (optional). Use ' |
        ' to break new lines:',
      footer:
        'Provide any issue tracker IDs associated with this change (optional). E.g., #123, #456:',
      confirmCommit: 'Are you sure you want to commit these changes?'
    }
  };
  