declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'mockjs' {
  const content: any;
  export = content;
}
declare module 'umi' {
  const content: any;
  export = content;
}
