/**
 * Created by hyc on 17-1-5.
 */
process.env.NODE_ENV = 'development'
import chai, { expect, assert } from 'chai'
import es6Prmise from 'es6-promise'
import fetch from 'isomorphic-fetch';
import charAsPromised from 'chai-as-promised'
es6Prmise.polyfill()
chai.use(charAsPromised)

global.fetch = fetch
global.expect = expect
global.assert = assert
// global.window = document.defaultView
chai.should()
