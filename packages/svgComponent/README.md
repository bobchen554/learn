
## [Docs]

**See the documentation at [xxx]()** for more information about using `svgcompenent`!


## Example

**Take an icon.svg**:

```html
<glyph glyph-name="shrink" unicode="&#58945;" d="M0 0h48v1H0z"  horiz-adv-x="1024" />
```

**Run SVGR**

```sh
const { SvgComponent } = require('svgcomponent');
new SvgComponent().run('svg')
```

**Output**

```js
const zaihui_shrink = "M0 0h48v1H0z"

export default {
  zaihui_shrink,
}
```

## use in Project
```js
import React from 'react'
import svgData from 'svgcomponent/dist'

const SvgComponent = (props) => (
  <svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <path d={svgData[props.type]} fill="currentColor" fillRule="evenodd" />
  </svg>
)

export default SvgComponent
```
