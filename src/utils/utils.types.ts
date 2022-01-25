// check if given type is undefined, NaN or null
export type Truthy<T> = T extends undefined
  ? false
  : T extends null
  ? false
  : T extends typeof Number.NaN
  ? false
  : T

// tested here https://www.typescriptlang.org/play?#code/KYDwDg9gTgLgBDAnmYcDKALAlgMxgHgBU5QZgA7AEwGc4BDcxAbQF0A+OAXjgAoeA6QTABccQgEouHBokmkKNXjwBQcODixRqI+owA0quIP5Rg20VnI5gUOACUzMZZM7TG4wwH57jw6PLAAG42ANzKygD0ESTg0PBIKHAAIsDAYAAKdLBYdAA2DgCOAK6awJREenDpHNwA3pHRampMANJwlnAA1sCIEDhi9LRt8lS0AKIgMFB0AMYELZXVcN7aUJYA5nCiLSwAtJ6ihSWm5Slpmdl5R6XlhK0si2xsDXAAvuGgkLAIyKhnYNcTkQanB6s02h1ur1+oQ9gcfMUbvh-oCykR7k9lO9wlEfolCHQsLkiDEyKM4EVyJ1yBAAO7kVgg4gjRRMSnUunkSrGSzWWwObQsF5qbwCpy4tT+IKhHHRBKoAlE-AAeVJCloyoARgArYBzSotEHDSbqro9PpwVXedJYGadFWVCYzXJFSjAfBQi3Kg1POAAMiqWRgOWJNrtDrgho4wmFkbV5IABgASWq8mxwAASr34KbTtkIrwTy0z8cUnv6VrEhOJyqYGYeYmjcACwVsUtb4XlcCdLrdLR6mRgGGoKtLGp1epgjy4VTHZuhluL6S2s5ZtGTqas6azOc3fLEheLGbn5cX3mP7fTl6gnd+cAAsnRuv3ENQLsG8hHDTPjWSy+aKyXW17W9bsQGdV13VPUCo39QNLlDYCv19bY5w3PNM2zXMt3zQ9zxPACzzUQwfBmaBygzSpH2fHo3yDEN8AAOQgchGKKXJcjoTVcndWt6zYSpCBQ5tpTbESO2UT44jxP5UgyeirmAREgUIaduBRJTjjRMN7VUsCILdD1CL0ntIJfQdhwqKonl9ANqOAF86IQqzqg+WJvi7ABBGdTL7Ac6CHEdCAwYAAFtgAAISKGAYBY9IoAgMBqEqAByXIIDoSgNhSuAAB84BShLKTdSgcvylKsmAOh+E1MqCumLKimoFLnmULtiDqQw6HhVYNkMTV-CKULNRsLE3K+eBLDIKAcFmBUQvCqKYrihKktBQwiqoMp4U1CAIB4hhDHSzKNh2vaDvII6Mqy8h1kIUgeqmPq1FtFi0DAWZTtEXrbsMagwEsAIoHez7bsetZfrUBqsCa+FyCGkabzUSq6FEVSxuUKabFmmYFUcda1ES4MWOoUR-nfENUVuBbIui2LyHixLkoK46bvWOrCogYqyg5lGao56GmpajGyPIbQEEcABGNH8c6wmwGJsXRDBJpWY2e7JlEFLseAawUoMJo4H+wGbBBmYNi11IcH1kj2lFs2LYK1JgBtw2UeV23ka1kqXdt941HebFJPc+I73JhT8k0m4ACYXJBDTlO0pCTPA3soOMx1U7M-zArjmy4PsxyKc-HSrN8hyc8svTqgE6zb0STzJeQn8CIXSti8Q8MYNsqokNA8ujLbn0m1-U10JwzDdwwgsi3wtd5y9YtDAcMioAoypG6Yli2I4rieJVOt2EE4SWyvcTRrau9POjmc4E34Kwtp5aGdW5mKtMarary+qTqF1rRfFnQaOohr4zhVmrW6GsdDaxmi7A2RsAbkCBg7W6WsAAsAA2TBABWV2ds3ofXNqggqtI3S0jgYYXEgtSZwAAMy0Pge7AmTRUYFT5ClQwgd66oAsoQCAaAnq3U8lAaYiB8CGGZCackP11jKCZGhbC+4MxVUoFhPc6ZFS5ELF4OATBjC8P4YI9YwjRH4GUZlWu+iAoYD4QIiGxiRF0DEZotgQpJS6NhGEbhVYiS0JJPPdkNJ6SMhnJIv8tA2RUiCVyIwggMJijccWMUfhz5QC8ZffE1YACq5AsAsXwMuAJUTOSCTnIEzkITuBhNNOU4JiTvB3AAAwsDnOkW2DTqx+KErba8KTT5pO8Z5Pxqp55al1PqQMQ45wyMqZMjATBmmt0Xt4QwHcCl90WNYhZ7AOABiGRGTROS8nkAKVs5pmyhwn1EuEQZaCZz7IfotOmK0maVCYGla62V2AZNQJ5bBLlplGPjnJKm6zwwpwMunBc1d857K6Rcmxhj7EmKcQUzEPy74YJnAYuxGwUViI+SdW6wtlAAPgHQbBID-mPKfvTRmSVUoQPZiCcBnziFTCKMAeBr1yAoPWN7a2IsSbwFAKFOgYAeJkzkh3UFNKlp0tfoytl7Nv6c25qVVVfMv7lWoS1MBhgeV8u9sAUhtI8FMJVl7J2ZCOEBwxl2AAMs3bgo9ySngHqBbmGgAiUA4N4eGw0z6usUOPJRaiMJZLwiWee0FixOr4g2LJTYZErmVBi+8M4nVyueS-V5BUtXCy7IxZ1cYY2EUrBy4AohZq5GoMADFy5uDFoHsQfKXrLBlEqO2n1tcUq1Vau1O56lpUR1lTTeVLyGUs2VQLLmW0NXlQLaq3V-9hUIDQWjIdzDNolVEJW7l9tCGOxSmQs1jCP4ezdpbPkgq7XYi7AASXIJCpIpQ5gluDbQWN3g2i9JeO1YZBpKgADUZwpX1nALJYDXhGiWYBa0GzIwjzg5B4sqoAwr3IvgYDlQmyxk-XAUN25w0TxnkeFDlZCB+NLv3LOhloKVAzE8QSjHKgJqbP0lc-TvGEFjt3bFiGB4Mf0mncy1iRzdx7msmjlQn0vrfQQSTrVSVrpgMA5II6EJjsfhO3NU7CVs1neq3mH9+bLt-s1FlBrD2g35U7U1PN4HUNEGg7BTm527vUHkOt56qqXqaJwjGGKADCo5RkTgmd+F1FGgJd0zpCweXph5wWk4h2CvSpIeTDjOULek+3C0y6HRIYwBPgvi2nRLMJUr9ueIVmScAABiX4KMst0cuSE5bBirikYoNo1ouOiRYKIWsOw3jBwmvVjMzWy1txBKluLSHdm9wW0J8tw9xvSS7AAcRnE1vL-aNtZcSA+mcU39vCyAA

// export interface DeepMerge {
//   <T extends Object, S extends Object>(target: T, source: S): T
//   <T extends Object, S extends Array<Object>>(target: T, ...sources: S): T & S[number]
// }

/* Make all properties required */
export type DeepRequired<T> = {
  [K in keyof T]-?: Required<DeepRequired<T[K]>>
}

/* exclude union type P from Object type O, only excludes when type P is a key of Object type O
interface ThemeButtonProps {
  rounded?: boolean
  loading?: boolean
  loadingText?: string
  iconSpacing?: string
  spinnerSpacing?: string
  radius?: number
  area: {
	  a?: string
	  b: number
	},
}
type A = ExcludeKeyPaths<ThemeButtonProps, 'loading' | 'rounded' | 'area.b' | 'radius'>
output - type A = "loading" | "rounded" | "radius" | "area"
* */
export type ExcludeKeyPaths<O extends Object, P> = P extends keyof O
  ? P
  : P extends `${infer H}.${infer T}`
  ? H extends keyof O
    ? H
    : never
  : never

/* Make properties of O represented by union type K partial, supports dot notation as well
e.g: MakeKeysPartial<ThemeButtonProps, 'loading' | 'rounded' | 'area.b' | 'radius'>
* */
export type MakeKeysPartial<O extends Object, K> = K extends keyof O
  ? Pick<O, Exclude<keyof O, K>> & Partial<Pick<O, K>>
  : K extends `${infer H}.${infer T}`
  ? H extends keyof O
    ? Record<H, MakeKeysPartial<NonNullable<O[H]>, T>>
    : never
  : never

/* Make all properties of T required except specified by union type P
e.g: DeepPartialRequired<ThemeButtonProps, 'loading' | 'rounded' | 'area.b' | 'radius'>
* */
export type DeepPartialRequired<T extends Object, P> = DeepRequired<
  Pick<T, Exclude<keyof T, ExcludeKeyPaths<T, P>>>
> &
  MakeKeysPartial<T, P>
