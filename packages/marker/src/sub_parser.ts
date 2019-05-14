import Parser, { SNP } from './parser';
import { Token, TokenType as TT, TokenType } from './token';
import {
  SubNode,
  SubTypes,

  InlineSection,

  Text,
  HardBreak,
  SoftBreak,
  Link,
} from './ast';

export default class SubParser extends Parser {
  constructor(tokens: Token[]) {
    super(tokens);
  }

  private parseText: SNP = (): Text => {
    const token = this.curToken();
    this.step();
    return {
      type: SubTypes.text,
      value: token.content,
    };
  }

  private parseHardbreak: SNP = (): HardBreak => {
    const token = this.curToken();
    this.step();
    return {
      type: SubTypes.hardbreak,
    };
  }

  private parseSoftBreak: SNP = (): SoftBreak => {
    const token = this.curToken();
    this.step();
    return {
      type: SubTypes.softbreak,
    };
  }

  private parseLink: SNP = (): Link => {
    const linkToken = this.curToken();
    this.step();

    if (!linkToken.attrs) {
      this.error(`Link doesn't have attrs\n=> ${JSON.stringify(linkToken)}`);
    }

    const href = (linkToken.attrs.find(attr => attr[0] === 'href') as string[])[1];
    const titleAttr = linkToken.attrs.find(attr => attr[0] === 'title') as string[];
    const parts = this.parseSection(TT.link_close);

    const link: Link = {
      type: SubTypes.link,
      parts,
      dest: href,
    };

    if (titleAttr) {
      link.title = titleAttr[1];
    }

    return link;
  }

  private getSubNodeParser = (tokenType: TT): SNP => {
    switch (tokenType) {
      case TT.text:
        return this.parseText;
      case TT.hardbreak:
        return this.parseHardbreak;
      case TT.softbreak:
        return this.parseSoftBreak;
      case TT.link_open:
        return this.parseLink;
      default:
        this.error(`No parser for tokentype ${tokenType}`);
        return this.invalidParser;
    }
  }

  private parseSection = (endToken: TokenType): InlineSection => {
    const parts: InlineSection = [];

    while (this.curToken().type !== endToken) {
      const curType = this.curToken().type;
      parts.push(this.getSubNodeParser(curType)());
    }
    this.step();
    return parts;
  }

  parseBlock = (): InlineSection => {
    console.log('parsing children of Inline token');

    const inlineSection: InlineSection = [];
    while (this.stillParsing()) {
      const curType = this.curToken().type;
      inlineSection.push(this.getSubNodeParser(curType)());
    }

    return inlineSection;
  }
}
