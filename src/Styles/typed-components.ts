import * as StyleThings from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

const {
    default: styled,
    keyframes,
    ThemeProvider,
    createGlobalStyle,
} = StyleThings as ThemedStyledComponentsModule<ITheme>;


export { keyframes, ThemeProvider, createGlobalStyle };
export default styled;