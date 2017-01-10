/**
 * Created by hyc on 17-1-5.
 */
process.env.NODE_ENV = 'development'
import chai, { expect, assert } from 'chai'
import es6Prmise from 'es6-promise'
import fetch from 'isomorphic-fetch';
import charAsPromised from 'chai-as-promised'
import jsdom from 'jsdom'

es6Prmise.polyfill()
chai.use(charAsPromised)
global.document = jsdom.jsdom('')
global.window = document.defaultView
console.log('window = ' + window);
global.fetch = fetch
global.expect = expect
global.assert = assert
chai.should()
