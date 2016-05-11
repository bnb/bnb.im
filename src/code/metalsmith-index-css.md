---
title: 'Metalsmith - /assets/css/index.js'
description: The index.js file for my Metalsmith instance. It contains universal styles for all `index` pages as well as individual, class-specified index pages.
slug: metalsmith-build-js
posted: "December 11, 2015 at 7:07AM"
date: 2015-12-11 07:07:00
---
```css
/* Components */
/* Component: .top (top navigation) */
header.top {
    padding: 15px 20%;
}

header.top .headerContainer {
    max-width: 1000px;
    content: "";
    clear: both;
}

header.top h1 {
    margin: 0;
    display: inline;
    border: 2px solid #b13737;
    text-decoration: none;
    background: transparent;
    color: #b13737;
    text-transform: lowercase;
    padding: 5px 10px;
    transition: background 0.5s, color 0.5s;
}

header.top h1:hover {
    border: 2px solid #b13737;
    background: #b13737;
    color: #fff;
    transition: background 0.5s, color 0.5s;
}

header.top ul {
    margin: 10px;
    padding: 0;
    float: right;
}

header.top li {
    display: inline;
    padding: 0 5px;
    font-size: 1.3rem;
}


/* Component: humongous */

.humongous {
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    background-color: #f6f6f6;
    text-align: center;
    padding: 125px 10px 100px;
}

.humongous .hello {
    margin-top: 20px;
    margin-bottom: 3px;
    font-size: 3rem;
}

/* Index button component */
.humongous .button {
    display: inline-block;
    padding: 10px 15px;
    background-color: transparent;
    border: 2px solid #b13737;
    color: #b13737;
    text-decoration: none;
    transition: all 0.5s;
}

.humongous .button:hover {
    display: inline-block;
    padding: 10px 15px;
    background-color: #b13737;
    border: 2px solid #b13737;
    color: #fefefe;
    transition: all 0.5s;
}

.humongous a.hidden {
	zoom: 1;
	filter: alpha(opacity=0);
	opacity: 0;
}

.humongous a.hidden:hover {
    display: inline-block;
    padding: 10px 15px;
    background-color: transparent;
    border: 2px solid #e9e9e9;
    color: #e9e9e9;
}

/* End Components */

h1.tlh {
  position: relative;
  text-align: center;
    margin-top: 0;
}

h1.tlh span {
    background: #fff;
    z-index: 2;
    position: relative;
    padding: 0 20px;
}

h1.tlh:after {
    content: '';
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 2px solid #B13737;
}

h2.tlh {
  position: relative;
  text-align: left;
    margin-top: 0;
}

h2.tlh span {
    background: #fff;
    z-index: 2;
    position: relative;
    padding: 0 20px;
}

h2.tlh:after {
    content: '';
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 2px solid #B13737;
}

.wid {
    text-align: center;
    padding: 50px 0px 100px;
}

.wid > p {
    width: 40%;
    margin: 0 auto 5%;

}

.widItem {
    margin: 0;
    float: left;
    background-color: #f6f6f6;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
    padding: 50px 50px 50px;
    width: 33.3%;
    height: 20em;
    border-left: #ddd;
    -webkit-transition: background-color 1s, color 1s, -webkit-transform 1s;
    transition: background-color 1s, color 1s, transform 1s;
}

.widItem:first-child {
    background-color: #fafafa;
    border-right: 1px solid #dbdbdb;
}

.widItem:last-child {
    background-color: #f1f1f1;
    border-left: 1px solid #dbdbdb;
}

.widItem:hover {
    background-color: #272727;
    color: #fff;

}

.widItem .fa {
    font-size: 3em;
    -webkit-transition: font-size 1s, margin-top 1s, -webkit-transform 1s;
    transition: font-size 1s, margin-top 1s, transform 1s;
}

.widItem:hover .fa  {
    font-size: 2em;
    margin-top: 5px;
}

.widItem h2 {
    font-size: 2.5em;
    -webkit-transition: font-size 1s, -webkit-transform 1s;
    transition: font-size 1s, transform 1s;
}

.widItem:hover h2 {
    font-size: 1.5em;
}

.widItem p {
    opacity: 0;
    -webkit-transition:opacity 1s, -webkit-transform 1s;
    transition: opacity 1s, transform 1s;
}

.widItem:hover p {
    opacity: 1;
}

.widItem .em {
    opacity: 0;
    -webkit-transition: opacity 1s;
    transition: opacity 1s;
}

.widItem:hover .em {
    opacity: 1;
}

.wia {
    padding: 50px 0px 100px;
    border-bottom: 1px solid #e9e9e9;
}

.wiaContainer {
    margin: 0 auto;
    width: 70%;
}
.contact {
    padding: 50px 0px 100px;
    background-color: #F6F6F6;
}

.formSec {
    padding: 20px 30px;
    border-left: 2px solid #b13737;
}

.socialSec {
    padding: 20px 30px;
}

.socialSec ul {
    padding: 0;
}

.socialSec li {
    list-style: none;
    margin-top: -1em;
}

.socialSec li:not(:first-child) {
    margin-top: 1em;
}

.socialSec a {
    display: inline-block;
    padding: 10px 15px;
    background-color: transparent;
    border: 2px solid #b13737;
    color: #b13737;
    text-decoration: none;
    width: 12em;
    text-align: center;
    transition: all 0.5s;
}

.socialSec a.blog:hover {
    background-color: #db2757;
    border: 2px solid #db2757;
    color: #fff;
    transition: all 0.5s;
}

.socialSec a.tent:hover {
    background-color: #08A14B;
    border: 2px solid #08A14B;
    color: #fff;
    transition: all 0.5s;
}

.socialSec a.gh:hover {
    background-color: #666;
    border: 2px solid #666;
    color: #fff;
    transition: all 0.5s;
}

.socialSec a.kb:hover {
    background-color: #FF8648;
    border: 2px solid #FF8648;
    color: #fff;
    transition: all 0.5s;
}
.socialSec a i {
    padding-right: 5px;
}

.contact h1 span {
    background-color: #F6F6F6;
}

@media screen and (max-width: 920px) {
    .widItem {
        width: 100%;
    }
}

@media screen and (max-width: 543px) {
    blockquote {
        width: inherit;
    }
}

/* Custom: blog-index */
.blog-index .content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.blog-index .cover-img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-color: #EEE;
}

.blog-index .cover-img h1 {
  text-shadow: 1px 1px 1px #000, 3px 3px 1px white;
}

.blog-index .content p, .content h1 {
      max-width: 800px;
      margin: 0 auto;
}

.blog-index .humongous:not(:nth-of-type(2n)) {
  background-color: #fff;
}

.blog-index .grayscale {
  max-width: 200px;
  margin: 0 auto;
  padding: 0;
  display: block;
}

.blog-index .humongous h1.hello {
  font-size: 2.25em;
  margin: 0 auto;
  padding: 0.25em;
  max-width: 800px;
}

.blog-index ul {
  margin: 0;
  padding: 0;
}

.blog-index .datetime {
  padding: 0 0 1em 0;
  display: block;
}

/* End components */



/* Custom: blog-index */
.blog-index .content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.blog-index .content p, .content h1 {
      max-width: 800px;
      margin: 0 auto;
}

.blog-index .humongous:not(:nth-of-type(2n)) {
  background-color: #fff;
}

.blog-index .grayscale {
  max-width: 200px;
  margin: 0 auto;
  padding: 0;
  display: block;
}

.blog-index .humongous h1.hello {
  font-size: 2.25em;
  margin: 0 auto;
  padding: 0.25em;
  max-width: 800px;
}

.blog-index ul {
  margin: 0;
  padding: 0;
}

.blog-index .datetime {
  padding: 0 0 1em 0;
  display: block;
}

/* Custom: code-index */
.code-index .code-block {
  max-width: 800px;
}

.code-index .code-literal pre {
  max-width: 600px;
  max-height: 500px;
  overflow: scroll;
}

.code-index .content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.code-index .content p, .content h1 {
      max-width: 800px;
      margin: 0 auto;
}

.code-index ul {
  margin: 0;
  padding: 0;
}

.code-index .datetime {
  padding: 0 0 1em 0;
  display: block;
}

.code-index .code-item {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}

.code-index .code-item .code-desc {
  width: 16em;
  margin: 2em;
}

.code-index .code-item .code-desc h1 {
  margin: 0 0 0.5em;
  padding: 0;
}

.code-index .code-item .code-block {
  max-width: 600px;
  max-height: 500px;
  flex:auto;
  overflow: scroll;
}

.code-index .code-item .code-block pre {
  padding: 1em;
  line-height: `1.5em``;
}
```
