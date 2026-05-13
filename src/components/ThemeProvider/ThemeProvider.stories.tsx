import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const meta = {
  title: 'Theming / ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ThemeProvider writes `data-theme="light" | "dark"` to `<html>`. Every component reads colors from `--rf-*` CSS variables that resolve against that attribute. The Storybook toolbar toggle drives the same attribute, so stories match the demo app exactly.',
      },
    },
  },
  // Children supplied by each story's `render`.
  args: { children: null },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Card style={{ width: 320 }}>
      <p style={{ marginBottom: 12 }}>
        Current theme: <strong>{theme}</strong>
      </p>
      <Button variant="secondary" onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'dark' : 'light'}
      </Button>
      <p style={{ marginTop: 12, color: 'var(--rf-color-text-tertiary)', fontSize: 13 }}>
        Tip: the Storybook toolbar paintbrush switches themes globally — this
        button only flips the in-context ThemeProvider state.
      </p>
    </Card>
  );
}

// Story is wrapped in ThemeProvider already by the preview decorator;
// this just demonstrates the useTheme() hook in a real consumer.
export const ThemeSwitch: Story = {
  render: () => <ThemeDemo />,
};
