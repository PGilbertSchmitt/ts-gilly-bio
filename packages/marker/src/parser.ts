import { Token, TokenType } from './token';
import {
  SubNode,
  BaseNode,
  Invalid,
} from './ast';

export type SNP = () => SubNode;
export type BNP = () => BaseNode;

export default abstract class Parser {
  curPos: number;
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.curPos = 0;
    this.tokens = tokens;
  }

  protected step = () => {
    this.curPos++;
  }

  protected curToken = () => {
    const { curPos, tokens } = this;
    if (curPos >= tokens.length) {
      this.error(`Out of bounds, attempted to access token ${curPos} of ${tokens.length} tokens`);
    }
    return tokens[curPos];
  }

  protected error = (msg: string) => {
    throw new Error(`Error while parsing token ${this.curPos}:\n${msg}\n`);
  }

  protected expect = (tt: TokenType) => {
    const curType = this.curToken().type;
    if (tt !== curType) {
      throw new Error(`At token ${this.curPos}: Expected ${tt}, got ${this.curToken().type}`);
    }
  }

  protected stillParsing = () => this.curPos < this.tokens.length;

  /* This won't be injected into the doc, it's only used to type the default case for the parser
   * selectors. This is only returned in two places, and a call to Parser#error precedes it, so
   * the parser will raise an exception first */
  protected invalidParser: (SNP & BNP) = () => Invalid;
}
