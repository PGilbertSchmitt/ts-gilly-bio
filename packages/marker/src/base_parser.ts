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

  ListItem,
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

  private parseListItems = (
    endToken: TT.ordered_list_close | TT.bullet_list_close
  ): ListItem[] => {
    const items: ListItem[] = [];
    while (this.curToken().type === TT.list_item_open) {
      const item = this.parseListItem();
      items.push(item);
    }

    if (this.curToken().type !== endToken) {
      this.error(`Expected to find ${endToken}, got ${JSON.stringify(this.curToken())}`);
    }

    this.step();
    return items;
  }

  private parseListItem = (): ListItem => {
    this.step();

    const parts: Paragraph[] = [];
    while (this.curToken().type === TT.paragraph_open) {
      const paragraph = this.parseParagraph() as Paragraph;
      parts.push(paragraph);
    }

    if (this.curToken().type !== TT.list_item_close) {
      this.error(`Expected to find list item close, got ${JSON.stringify(this.curToken())}`);
    }
    this.step();

    return { parts };
  }

  private parseBulletList = (): BulletList => {
    this.step();
    const items = this.parseListItems(TT.bullet_list_close);
    return {
      type: BaseTypes.bulletList,
      list: items,
    };
  }

  private parseOrderedList = (): OrderedList => {
    this.step();
    const items = this.parseListItems(TT.ordered_list_close);
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
      case TT.fence:
        return this.parseFence;
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
