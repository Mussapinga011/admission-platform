declare module 'react-katex' {
  import { Component } from 'react';

  export interface KatexProps {
    children?: string;
    math?: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    settings?: any;
  }

  export class InlineMath extends Component<KatexProps> {}
  export class BlockMath extends Component<KatexProps> {}
}
