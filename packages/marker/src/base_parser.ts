import Parser, { BNP } from './parser';
import SubParser from './sub_parser';
import { Token, TokenType as TT } from './token';
import {
  BaseTypes,

  InlineSection,

  MarkdownDoc,
  Paragraph,
  Heading,
  HorizontalRow,
  Fence,
  BulletList,
  OrderedList,
} from './ast';

type oneToSix = 1 | 2 | 3 | 4 | 5 | 6;

export default class BaseParser extends Parser {
  doc: MarkdownDoc;

  constructor(tokens: Token[]) {
    super(tokens);
  }

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

  private parseHorizontalRow: BNP = (): HorizontalRow => {
    this.step();
    return {
      type: BaseTypes.horizontalRow,
    };
  }

  private parseParagraph = (): Paragraph => {
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

  private parseFence: BNP = (): Fence => {
    const { content } = this.curToken();
    this.step();
    return {
      type: BaseTypes.fence,
      value: content,
    };
  }

  // private parseListItem = (): InlineSection => {
  // }

  private parseListItems = (): InlineSection[] => {
    const items: InlineSection[] = [];
    while (this.curToken().type === TT.paragraph_open) {
      const paragraph = this.parseParagraph() as Paragraph;
      items.push(paragraph.parts);
    }

    if (this.curToken().type !== TT.list_item_close) {
      this.error(`Expected to find list item close, got ${JSON.stringify(this.curToken())}`);
    }

    this.step();
    return items;
  }

  private parseBulletList = (): BulletList => {
    this.step();
    const items = this.parseListItems();
    return {
      type: BaseTypes.bulletList,
      list: items,
    };
  }

  private parseOrderedList = (): OrderedList => {
    this.step();
    const items = this.parseListItems();
    return {
      type: BaseTypes.orderedList,
      list: items,
    };
  }

  private getBaseNodeParser = (tokenType: TT): BNP => {
    switch (tokenType) {
      case TT.paragraph_open:
        return this.parseParagraph;
      case TT.heading_open:
        return this.parseHeading;
      case TT.hr:
        return this.parseHorizontalRow;
      case TT.bullet_list_open:
        return this.parseBulletList;
      case TT.ordered_list_open:
        return this.parseOrderedList;
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
