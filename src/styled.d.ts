// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      bgColor_02: string;
      bgColorBlack: string;
      backgroundColor: string;
      textColor: string;
      textColorskyBlue: string;
      textColorIvory: string;
    };
  }
}
