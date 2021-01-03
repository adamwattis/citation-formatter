import CitationFormatter, { APA, MLA } from './index'

// Test citation
const testCitation = {
    authors: [{first: "Jomara", last: "Sandbulte"}, {first: "Chun-Hua", last: "Tsai"}, {first: "John M.", last: "Carroll"}],
    year: '2021',
    title: 'Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living',
    publisher: 'International Journal of Human-Computer Studies',
    url: 'http://dx.doi.org/10.1016/j.ijhcs.2020.102559'
}
// Array of test citations
const testCitationsArray = [
    {
        authors: [{first: "Jomara", last: "Sandbulte"}, {first: "Chun-Hua", last: "Tsai"}, {first: "John M.", last: "Carroll"}],
        year: '2021',
        title: 'Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living',
        publisher: 'International Journal of Human-Computer Studies',
        url: 'http://dx.doi.org/10.1016/j.ijhcs.2020.102559'
    },
    {
        authors: [{first: "Jomara", last: "Sandbulte"}, {first: "Chun-Hua", last: "Tsai"}, {first: "John M.", last: "Carroll"}],
        year: '2021',
        title: 'Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living',
        publisher: 'International Journal of Human-Computer Studies',
        url: 'http://dx.doi.org/10.1016/j.ijhcs.2020.102559'
    },
    {
        authors: [{first: "Jomara", last: "Sandbulte"}, {first: "Chun-Hua", last: "Tsai"}, {first: "John M.", last: "Carroll"}],
        year: '2021',
        title: 'Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living',
        publisher: 'International Journal of Human-Computer Studies',
        url: 'http://dx.doi.org/10.1016/j.ijhcs.2020.102559'
    }
]
// Expected test citation results
const testResultAPA = 'Sandbulte, J., Tsai, C., Carroll, J. (2021). Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living. International Journal of Human-Computer Studies. http://dx.doi.org/10.1016/j.ijhcs.2020.102559'
const testResultMLA = 'Jomara Sandbulte, et al. (2021). "Family’s health: Opportunities for non-collocated intergenerational families collaboration on healthy living." International Journal of Human-Computer Studies. http://dx.doi.org/10.1016/j.ijhcs.2020.102559'

describe('citation formatter', () => {
    const formatter = CitationFormatter()
    test('successfully reads one citation', () => {
        expect(formatter.cite(testCitation)).toBeTruthy();
    });
  
    test('successfully reads array of citations', () => {
        expect(formatter.cite(testCitationsArray)).toBeTruthy();
    });
    test('thows error when required field not included', () => {
        const newCitation = {...testCitation}
        delete newCitation.authors
        expect(() => {
            formatter.cite(newCitation)
        }).toThrow('Field authors is required');
    })
    test('throws error when authors field is not an array', () => {
        const newCitation = {...testCitation}
        newCitation.authors = 'Adam'
        expect(() => {
            formatter.cite(newCitation)
        }).toThrow('Field authors must be of type Array');
    })
    test('throws error when author object is missing required field', () => {
        const newCitation = {...testCitation}
        newCitation.authors = [{}]
        expect(() => {
            formatter.cite(newCitation)
        }).toThrow(`Each author must have properties 'first' and 'last'`);
    })
    test('returns empty array for APA and MLA when no citations included', () => {
        formatter.cite([])
        expect(formatter.APA()).toEqual([])
        expect(formatter.MLA()).toEqual([])
    })
    test('successfully cites in APA format', () => {
        formatter.cite(testCitation)
        expect(formatter.APA()[0]).toBe(testResultAPA)
    })
    test('successfully cites in MLA format', () => {
        formatter.cite(testCitation)
        expect(formatter.MLA()[0]).toBe(testResultMLA)
    })
  });



describe('APA formatter', () => {
    test('successfully reads and returns APA citation', () => {
        const APACitation = APA(testCitation)
        expect(APACitation[0]).toBe(testResultAPA)
    })
    test('successfully reads and returns APA citations array', () => {
        const APACitations = APA(testCitationsArray)
        expect(APACitations[0]).toBe(testResultAPA)
    })
    test('returns empty array when no citations included', () => {
        const emptyArr = APA()
        expect(emptyArr).toEqual([])
    })
})



describe('MLA formatter', () => {
    test('successfully reads and returns MLA citation', () => {
        const MLACitation = MLA(testCitation)
        expect(MLACitation[0]).toBe(testResultMLA)
    })
    test('successfully reads and returns MLA citations array', () => {
        const MLACitations = MLA(testCitationsArray)
        expect(MLACitations[0]).toBe(testResultMLA)
    })
    test('returns empty array when no citations included', () => {
        const emptyArr = MLA()
        expect(emptyArr).toEqual([])
    })
})
const myCitationObject = { authors: [{first: 'John', last: 'Doe'}], year: '2021', title: 'Title', publisher: 'Publisher', url: 'https://example.com/link-to-article'}
console.log(APA(myCitationObject))
console.log(MLA(myCitationObject))