# jquery-odontogram plugin

Easy to use jQuery plugin for creating Odontogram using HTML5 Canvas.

Example
-----
![Example 1](1.gif)
![Example 2](2.gif)
![Example 3](3.gif)

Usage
-----
Initialize Odontogram, make sure the element is a Canvas.
```js
$("#odontogram-canvas").odontogram({
	width: "900px",
	height: "420px"
});
```

Set to Default mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_DEFAULT);
```

Set to Delete mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_HAPUS);
```

Set to AMF mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_AMF);
```

Set to AMF mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_AMF);
```

Set to COF mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_COF);
```

Set to FIS mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_FIS);
```

Set to NVT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_NVT);
```

Set to RCT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_RCT);
```

Set to NON mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_NON);
```

Set to UNE mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_UNE);
```

Set to PRE mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_PRE);
```

Set to ANO mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ANO);
```

Set to CARIES mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_CARIES);
```

Set to CFR mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_CFR);
```

Set to FMC mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_FMC);
```

Set to POC mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_POC);
```

Set to RRX mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_RRX);
```

Set to MIS mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_MIS);
```

Set to IPX mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_IPX);
```

Set to FRM_ACR mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_FRM_ACR);
```

Set to BRIDGE mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_BRIDGE);
```

Set to ARROW_TOP_LEFT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_TOP_LEFT);
```

Set to ARROW_TOP_RIGHT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_TOP_RIGHT);
```

Set to ARROW_TOP_TURN_LEFT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_TOP_TURN_LEFT);
```

Set to ARROW_TOP_TURN_RIGHT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_TOP_TURN_RIGHT);
```

Set to ARROW_BOTTOM_LEFT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_BOTTOM_LEFT);
```

Set to ARROW_BOTTOM_RIGHT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_BOTTOM_RIGHT);
```

Set to ARROW_BOTTOM_TURN_LEFT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_BOTTOM_TURN_LEFT);
```

Set to ARROW_BOTTOM_TURN_RIGHT mode.
```js
$("#odontogram-canvas").odontogram('setMode', ODONTOGRAM_MODE_ARROW_BOTTOM_TURN_RIGHT);
```

Event listener for get all the position with the procedure name (code)
```js
$('#odontogram').on('change', function (_, geometry) {
	console.log(geometry)
})
```

Set data by Position and Procedure Name (code).
```js
$("#odontogram-canvas").data('odontogram').setGeometryByPos([
	{ code: 'AMF', pos: '18-R' },
	{ code: 'AMF', pos: '18-L' },
	{ code: 'CARIES', pos: '83-M' },
	{ code: 'POC', pos: '84' },
]);
```
or
```js
var odontogram = $("#odontogram-canvas").odontogram('init', {
	width: "900px",
	height: "420px"
});
odontogram.setGeometryByPos([
	{ code: 'AMF', pos: '18-R' },
	{ code: 'AMF', pos: '18-L' },
	{ code: 'CARIES', pos: '83-M' },
	{ code: 'POC', pos: '84' },
]);
```


Contribute
----
If you like the project please support with your contribution.

[Donate on Paypal](https://www.paypal.me/adhiana46)

Thank you and Happy Coding :)