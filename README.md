# Gilly's Bio 2.0
## A new truck stop on the Information Superhighway

I wanted to rebuild my portfolio site, so sue me

### Important technologies used:
- React/~~Redux/Saga~~
  - Thanks to some advice from John Haugeland, I've removed my dependencies on Redux, and now I feel free as a bird 
- NestJS (Because ExpressJS is so blasé)
- Docker (Yeah? And?)
- TypeScript (They say it allows you to peer into the hearts of mortal men)

### Motivation

Indefinite WIP

### Notes

#### Styles

I use `sass-loader` -> `css-loader` -> `style-loader` to add my styles. However, since I'm also using TypeScript with strictness turned to 11, the styles need typings for the components to be aware of the correct class names. What I've done feels messy and not as minimal as I would have hoped, but it's good enough for me until I figure out a cleaner system. Essentially, all `*.scss` files in  _src/styles/_ are paired with a `*.scss.d.ts` type definition file. The only things that need to be in here are an export of all class names as enpty string variables (using **camelCase** instead of **kebab-case**). The loaders will handle the rest. Example:

```SCSS
// @styles/my_styles.scss
.my-class {
  width: 5px;

  .my-other-class {
    background-color: blue;
  }
}
```

```TS
// @styles/my_styles.scss.d.ts
export const myClass: string;
export const myOtherClass: string;
```

This way, they can easily be imported and the compiler won't complain:

```TSX
// @comp/my_component.tsx
import styles from '@styles/my_styles.scss';

export const Thing: SFC = () => (
  <Foo className={styles.myClass}>
    <Bar className={styles.myOtherClass} />
  </Foo>
)
//...
```