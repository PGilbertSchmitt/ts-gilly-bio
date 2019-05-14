import Parser, { BNP } from './parser';
import SubParser from './sub_parser';
import { Token, TokenType as TT } from './token';
import {
  MarkdownDoc,
  BaseTypes,
  BaseNode,

  Paragraph,
  Heading,
  InlineSection,
} from './ast';

type oneToSix = 1 | 2 | 3 | 4 | 5 | 6;

export default class BaseParser extends Parser {
  doc: MarkdownDoc;

  constructor(tokens: Token[]) {
    super(tokens);
  }

  /* Base Node Parsers */

  // private parseInline = (tokens: Token[]): InlineSection => {
  // const inlineParser = new Parser(tokens);
  // const subNodes: InlineSection = [];

  // const inlinePos = 0;
  // while (inlinePos < tokens.length) {
  //   subNodes.push(this.getSubNodeParser(tokens[inlinePos].type)());
  // }

  // return inlineParser.parse();
  // }

  private parseInlineToken = (): InlineSection => {
    const inlineToken = this.curToken();
    if (inlineToken.type !== TT.inline || !inlineToken.children) {
      this.error('Expected inline token');
    }

    // Call to error should prevent children from being null
    const childTokens = this.curToken().children as Token[];
    const parts = new SubParser(childTokens).parseBlock();

    this.step();
    this.step();
    return parts;
  }

  private parseParagraph: BNP = (): Paragraph => {
    this.step();

    return {
      type: BaseTypes.paragraph,
      parts: this.parseInlineToken(),
    };
  }

  private parseHeading: BNP = (): Heading => {
    // I'm trusting the markup to always be a string of hash signs
    const size = this.curToken().markup.length as oneToSix;

    this.step();

    return {
      type: BaseTypes.heading,
      parts: this.parseInlineToken(),
      size,
    };
  }

  private getBaseNodeParser = (tokenType: TT): BNP => {
    switch (tokenType) {
      case TT.paragraph_open:
        return this.parseParagraph;
      case TT.heading_open:
        return this.parseHeading;
      default:
        this.error(`No parser for tokentype ${tokenType}`);
        return this.invalidParser;
    }
  }

  parse = (): MarkdownDoc => {
    if (this.doc) {
      return this.doc;
    }

    this.doc = [];

    console.log('heyhey');
    while (this.stillParsing()) {
      const curType = this.curToken().type;
      this.doc.push(this.getBaseNodeParser(curType)());
    }

    return this.doc;
  }
}
