/**
 * Created by hyc on 17-1-5.
 */

import React from 'react'
import chai, { expect, assert } from 'chai'
import es6Prmise from 'es6-promise'
import fetch from 'isomorphic-fetch';
import charAsPromised from 'chai-as-promised'
import jsdom from 'jsdom'
import { shallow, render, mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
es6Prmise.polyfill()
chai.use(charAsPromised)
chai.use(chaiEnzyme())

global.document = jsdom.jsdom('')
global.window = document.defaultView
global.fetch = fetch
global.expect = expect
global.assert = assert
global.navigator = { userAgent: 'browser' }
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
chai.should()

