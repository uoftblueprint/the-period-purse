// So you don't need to write 'require(....)' each time
declare module '*.svg' {
  const source: NonNullable<import('expo-image').ImageProps['source']>;
  export default source;
}
