const API_KEY = ``

export const googleSheetToJSON = async (sheetId: string) => {
  const json = await fetch(
    `https://content-sheets.googleapis.com/v4/spreadsheets/${sheetId}?${new URLSearchParams(
      {
        includeGridData: "true",
        key: API_KEY,
      },
    )}`,
    {
      method: "GET",
      headers: {
        "X-Referer": "https://explorer.apis.google.com",
      },
    },
  ).then<R>((r) => r.json())

  return json
}

export interface R {
  spreadsheetId: string
  properties: RProperties
  sheets: Sheet[]
  spreadsheetUrl: string
}

export interface RProperties {
  title: string
  locale: string
  autoRecalc: string
  timeZone: string
  defaultFormat: DefaultFormat
  spreadsheetTheme: SpreadsheetTheme
}

export interface DefaultFormat {
  backgroundColor: Color
  padding: Padding
  verticalAlignment: VerticalAlignment
  wrapStrategy: WrapStrategy
  textFormat: DefaultFormatTextFormat
  backgroundColorStyle: BackgroundColorStyle
}

export interface Color {
  red?: number
  green?: number
  blue?: number
}

export interface BackgroundColorStyle {
  rgbColor: Color
}

export interface Padding {
  top: number
  right: number
  bottom: number
  left: number
}

export interface DefaultFormatTextFormat {
  foregroundColor: ForegroundColor
  fontFamily: string
  fontSize: number
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  foregroundColorStyle: ForegroundColorStyle
}

export interface ForegroundColor {}

export interface ForegroundColorStyle {
  rgbColor: ForegroundColor
}

export enum VerticalAlignment {
  Bottom = "BOTTOM",
  Middle = "MIDDLE",
}

export enum WrapStrategy {
  OverflowCell = "OVERFLOW_CELL",
  Wrap = "WRAP",
}

export interface SpreadsheetTheme {
  primaryFontFamily: FontFamily
  themeColors: ThemeColor[]
}

export enum FontFamily {
  Arial = "Arial",
  Calibri = "Calibri",
  CalibriArial = "Calibri, Arial",
  Montserrat = "Montserrat",
  MontserratArial = "Montserrat,Arial",
}

export interface ThemeColor {
  colorType: string
  color: BackgroundColorStyle
}

export interface Sheet {
  properties: SheetProperties
  data: Datum[]
  merges?: Range[]
  filterViews?: FilterView[]
  basicFilter?: BasicFilter
  bandedRanges?: BandedRange[]
}

export interface BandedRange {
  bandedRangeId: number
  range: Range
  rowProperties: RowProperties
}

export interface Range {
  startRowIndex: number
  endRowIndex: number
  startColumnIndex: number
  endColumnIndex: number
  sheetId?: number
}

export interface RowProperties {
  firstBandColor: Color
  secondBandColor: Color
  firstBandColorStyle: BackgroundColorStyle
  secondBandColorStyle: BackgroundColorStyle
  headerColor?: Color
  headerColorStyle?: BackgroundColorStyle
}

export interface BasicFilter {
  range: Range
  criteria: BasicFilterCriteria
  filterSpecs: FilterSpec[]
}

export interface BasicFilterCriteria {
  "5": ForegroundColor
}

export interface FilterSpec {
  columnIndex: number
  filterCriteria: ForegroundColor
}

export interface Datum {
  rowData?: RowDatum[]
  rowMetadata: Metadatum[]
  columnMetadata: Metadatum[]
}

export interface Metadatum {
  pixelSize: number
}

export interface RowDatum {
  values: Value[]
}

export interface Value {
  userEnteredValue?: EffectiveValueClass
  effectiveValue?: EffectiveValueClass
  formattedValue?: string
  userEnteredFormat?: UserEnteredFormat
  effectiveFormat?: EffectiveFormat
  hyperlink?: string
  textFormatRuns?: TextFormatRun[]
}

export interface EffectiveFormat {
  backgroundColor: Color
  padding: Padding
  horizontalAlignment?: HorizontalAlignment
  verticalAlignment: VerticalAlignment
  wrapStrategy: WrapStrategy
  textFormat: EffectiveFormatTextFormat
  hyperlinkDisplayType?: HyperlinkDisplayType
  backgroundColorStyle: BackgroundColorStyle
  numberFormat?: NumberFormat
  borders?: Borders
}

export interface Borders {
  top?: Bottom
  left?: Bottom
  right?: Bottom
  bottom?: Bottom
}

export interface Bottom {
  style: Style
  width: number
  color: Color
  colorStyle: BackgroundColorStyle
}

export enum Style {
  Double = "DOUBLE",
  Solid = "SOLID",
}

export enum HorizontalAlignment {
  Center = "CENTER",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum HyperlinkDisplayType {
  Linked = "LINKED",
  PlainText = "PLAIN_TEXT",
}

export interface NumberFormat {
  type: Type
  pattern: Pattern
}

export enum Pattern {
  HMmAmPm = "h:mm am/pm",
  MmmD = "mmm d",
  The0 = '"$"#,##0',
  The000 = '"$"#,##0.00',
}

export enum Type {
  Currency = "CURRENCY",
  Date = "DATE",
  Time = "TIME",
}

export interface EffectiveFormatTextFormat {
  foregroundColor?: Color
  fontFamily?: FontFamily
  fontSize?: number
  bold?: boolean
  italic?: boolean
  strikethrough?: boolean
  underline?: boolean
  foregroundColorStyle?: BackgroundColorStyle
  link?: Link
}

export interface Link {
  uri: string
}

export interface EffectiveValueClass {
  stringValue?: string
  numberValue?: number
}

export interface TextFormatRun {
  format: Format
  startIndex?: number
}

export interface Format {
  foregroundColor?: Color
  underline?: boolean
  foregroundColorStyle?: BackgroundColorStyle
  link?: Link
  bold?: boolean
  fontFamily?: FontFamily
}

export interface UserEnteredFormat {
  backgroundColor?: Color
  horizontalAlignment?: HorizontalAlignment
  verticalAlignment?: VerticalAlignment
  wrapStrategy?: WrapStrategy
  textFormat?: EffectiveFormatTextFormat
  backgroundColorStyle?: BackgroundColorStyle
  numberFormat?: NumberFormat
  hyperlinkDisplayType?: HyperlinkDisplayType
  borders?: Borders
}

export interface FilterView {
  filterViewId: number
  title: string
  range: Range
  criteria: FilterViewCriteria
  filterSpecs: FilterSpec[]
}

export interface FilterViewCriteria {
  "8": ForegroundColor
}

export interface SheetProperties {
  sheetId: number
  title: string
  index: number
  sheetType: string
  gridProperties: GridProperties
  hidden?: boolean
}

export interface GridProperties {
  rowCount: number
  columnCount: number
  frozenRowCount?: number
}
