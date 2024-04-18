# Notes for cs260
## 10/Jan
`code .` in commandline opens vscode on current dir
## 19/Jan
Server IP address: 52.90.79.234
To remote shell into server (ssh): ssh -i [path to key] ubuntu@52.90.79.234
## Midterm Review
### Valid JSON
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}

import fonts using something like `@import url('https://fonts.googleapis.com/css2?family=Rubik');`

content, padding, border, margin

### Arrow Functions
const f = (parameters) => param1 + param2
the ()s are unneccessary if only one param.

div is division element
match() can be used with RegEx. match(/a|B/i) anything between // is regex, i afterwards means case insensitive.

const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4

querySelector selects first given element unless using querySelectorAll

### JS Objects (dictionaries or maps)
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
const obj = {
  a: 3,
  b: 'fish',
};

DOM textContent property sets child text for a given element. 
`<a href='link.link'/a>` for hyperlink
`src='link.link` for references to other files in code.

div.header if class="header"
`#header` if looking for id="header"

chmod +x deploy.sh makes script executable
use CNAME to point to another DNS record, SOA is start of authority, A maps domain names to IP addresses

Port 80 Http
443 Https
22 SSH



