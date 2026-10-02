/** The 2.0 package exposes no compatibility pipes; these are only URL migrations. */
export const DOC_REDIRECTS = [
  { selector: 'localized', target: 'localizedDate' },
  { selector: 'filesize', target: 'fileSize' },
  { selector: 'roundHalfUp', target: 'roundHalf' },
  { selector: 'camelCaseToTitleSeperatedCase', target: 'camelCaseToTitleSeparatedCase' },
  { selector: 'formatInstanceofDate', target: 'formatDateTime' },
  { selector: 'imgUrlBase64', target: 'base64ImageUrl' },
] as const;
