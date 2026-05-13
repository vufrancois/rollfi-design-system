import type { Preview, Decorator } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { IconContext } from '@phosphor-icons/react';
import { ThemeProvider } from '../src/components/ThemeProvider/ThemeProvider';

// Tokens + global resets + font-face imports. One import, every story themed.
import '../src/tokens/index.css';

// Wrap every story in ThemeProvider + Phosphor icon defaults so stories
// behave exactly like the demo app and the production portal.
const withProviders: Decorator = (Story, context) => {
  // The `theme` global comes from withThemeByDataAttribute below; we feed it
  // into ThemeProvider so context consumers (useTheme()) see the right value
  // even though the data-theme attribute is set by the addon.
  const theme = (context.globals.theme as 'light' | 'dark') ?? 'light';
  return (
    <ThemeProvider defaultTheme={theme} key={theme}>
      <IconContext.Provider value={{ weight: 'regular', size: 16 }}>
        <Story />
      </IconContext.Provider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withProviders,
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true }, // tokens drive the canvas color
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
