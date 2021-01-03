# citation-formatter 📚
A small JS module to create academic citations in APA and MLA format.
* Supports APA and MLA
* Small size (1.5kb)
* Flexible API
## Getting Started
The ususal:
```
npm install citation-formatter
```
Create a citation object to cite:
```javascript
const myCitationObject = { authors: [{first: 'John', last: 'Doe'}], year: '2021', title: 'Title', publisher: 'Publisher', url: 'https://example.com/link-to-article'}
```
Which will have the following expected output in APA and MLA:
> Doe, J. (2021). Title. Publisher. https://example.com/link-to-article

> John Doe, et al. (2021). "Title." Publisher. https://example.com/link-to-article
### Factory function
You can either import the CitationFormatter factory function to read citation objects with the `cite()` method, and use each format method to return formatted citations:
```javascript
import CitationFormatter from 'citation-formatter'
const formatter = CitationFormatter()
formatter.cite(myCitationObjects)
// Return array of citation strings formatted in APA and MLA
const myAPACitations = formatter.APA()
const myMLACitations = formatter.MLA()
```
### Import individual formats
Or you can import each formatter alone and pass them citation objects directly:
```javascript
import { APA, MLA } from 'citation-formatter'
const myAPACitations = APA(myCitationObjects)
const myMLACitations = MLA(myCitationObjects)
```
## Citation object
`citation-formatter` accepts either one citation object, or an array of citation objects. The citation objects should have the following shape, or an error will throw:
| Field      | Type   | Required |
| ---------- | ------ | :------: |
| `authors`  | Array  | Yes      |
| `year`     | String | Yes      |
| `title`    | String | Yes      |
| `publisher`| String | Yes      |
| `url`      | String | Yes      |

`author` objects must have the following shape:
| Field    | Type   | Required |
| -------- | ------ | :------: |
| `first`  | String | Yes      |
| `last`   | String | Yes      |

Example:
```javascript
const myCitationObject = {
    authors: [
        {first: 'John', last: 'Doe'}
    ], 
    year: '2021', 
    title: 'Title', 
    publisher: 'Publisher', 
    url: 'https://example.com/link-to-article'
}
```
## License
Licensed under the MIT License