# regedit-simple
A very simple, and incomplete registry editor for Node.js.

These functions are enough for me. Need more? [Create issue!](https://github.com/utyfua/regedit-simple/issues/new)

## Installation
```sh
$ npm install --save regedit-simple
```

### Example
```javascript
var regedit = require('regedit-simple');

// simplifed version
regedit.addKey({
	target: 'HKCU\\Software\\TestDemo',
	name: 'MyApp',
	value: 'heyLookAValue',
	type: 'REG_SZ'
}).then(function(result) {
	console.log(result);
	// get own data
	regedit.getKey({
		target: 'HKCU\\Software\\TestDemo'
	}).then(function(result) {
		console.log(result);
		// destroy own data
		regedit.delete({
			target: 'HKCU\\Software\\TestDemo'
		}).then(function(result) {
			console.log(result);
		})
	})
})
```

## Api
Include in your project
```javascript
var regedit = require('regedit-simple');
```

### regedit.get(string target)
Get at what is contained in a particular Registry key(target)
```javascript
regedit.query('HKEY_CURRENT_USER\\Software\\7-Zip').then(funciton(data){
	//example data
	data={
		ths: 'HKEY_CURRENT_USER\\Software\\7-Zip',
		values:
		{
			Path64: 'C:\\Program Files\\7-Zip\\',
			Path: 'C:\\Program Files\\7-Zip\\' 
		},
		valuesTypes: {
			Path64: 'REG_SZ',
			Path: 'REG_SZ'
		},
		childsList: [
			'HKEY_CURRENT_USER\\Software\\7-Zip\\FM'
		],
		childsListAbs: ['FM']
	}
});
```
Aliases: regedit.query, regedit.getKey

### regedit.addKey(object)
Add keys and values to the Registry
```javascript
regedit.addKey({
	target:'string',
	name:'string', // Adds or changes a value
	type:'string', // The type of value: REG_BINARY, REG_DWORD, REG_SZ, REG_MULTI_SZ, etc. The default is REG_SZ
	value:'string' // The data to assign to a value
});
```
Aliases: regedit.add

### regedit.delete(object)
Delete keys and values to the Registry
```javascript
regedit.delete({
	target:'string',
	name:'string' or 'don`t set(undefined)', // Deletes a value
	del_default:bool or 'don`t set(undefined)', // Deletes a key's default value
	del_all:bool or 'don`t set(undefined)' // Deletes all values from a key
});
```
Aliases: regedit.del

## Notes
* If name is specified, it will return the single value (or a message indicating none is available).

## TODO
* Testing
* Support specified names