
// Required fields for citation object
export const CITATION_OBJECT_FIELDS = [
    'authors',
    'title',
    'year',
    'publisher',
    'url'
]
export const FORMATS = [
    'APA',
    'MLA'
]

const validateCitationObject = (citation) => {
    CITATION_OBJECT_FIELDS.forEach(field => {
        if (!citation.hasOwnProperty(field)) throw new Error(`Field ${field} is required`)
        if (field === 'authors') {
            if (!(citation[field] instanceof Array)) throw new Error(`Field ${field} must be of type Array`)
            citation[field].forEach(authorObject => {
                if (!(authorObject.hasOwnProperty('first') && authorObject.hasOwnProperty('last'))) throw new Error(`Each author must have properties 'first' and 'last'`)
            })
        }
    })
    return true
}
const validateCitations = (citations) => {
    // Below code will throw error if not all required fields included
    if (citations instanceof Array) {
        if (citations === []) return citations
        citations.forEach(citation => {
            validateCitationObject(citation)
        })
        return citations
    } else {
        validateCitationObject(citations)
        return [citations]
    }
}

export const APA = (citations = []) => {
    let citationArr = validateCitations(citations)
    if (citationArr.length > 0) {
        return citationArr.map(citation => {
            return makeAPAString(citation)
        })
    }
    return citationArr
}

export const MLA = (citations = []) => {
    let citationArr = validateCitations(citations)
    if (citationArr.length > 0) {
        return citationArr.map(citation => {
            return makeMLAString(citation)
        })
    }
    return citationArr
}
const makeAPAString = ({authors, year, title, publisher, url}) => {
    let formattedAuthors = authors.map(author => {
        return `${author.last}, ${author.first[0]}.`
    })
    // Assemble APA string
    return `${formattedAuthors.join(', ')} (${year}). ${title}. ${publisher}. ${url}`
}
const makeMLAString = ({authors, year, title, publisher, url}) => {
    // Assemble MLA string
    return `${authors[0].first} ${authors[0].last}, et al. (${year}). "${title}." ${publisher}. ${url}`
}

const CitationFormatter = () => {

    let currentCitations = []

    const cite = (citations) => {
        currentCitations = validateCitations(citations)
        return true
    }

    const getAPA = () => {
        let citations = APA(currentCitations)
        return citations
    }
    const getMLA = () => {
        let citations = MLA(currentCitations)
        return citations
    }

    return {currentCitations, cite, MLA: getMLA, APA: getAPA}

}
export default CitationFormatter