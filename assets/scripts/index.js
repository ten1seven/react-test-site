"use strict";var Slide=React.createClass({displayName:"Slide",render:function(){return React.createElement("img",{alt:"",src:this.props.image})}}),Carousel=React.createClass({displayName:"Carousel",render:function(){var e=[];return this.props.slides.forEach(function(t){e.push(React.createElement(Slide,{image:t.image,key:t.name}))}),React.createElement("section",{className:"carousel"},e)}}),PageNavLink=React.createClass({displayName:"PageNavLink",render:function(){return React.createElement("li",null,React.createElement("a",{href:"#TODO"},this.props.category))}}),ProductNav=React.createClass({displayName:"ProductNav",render:function(){var e=[],t=null;return this.props.products.forEach(function(a){a.category!==t&&e.push(React.createElement(PageNavLink,{category:a.category,slug:a.slug,key:a.category})),t=a.category}),React.createElement("nav",{className:"page-nav"},React.createElement("div",{className:"wrapper"},React.createElement("h2",{className:"sr-only"},"Page Navigation"),React.createElement("ul",null,e)))}}),ProductListItem=React.createClass({displayName:"ProductListItem",render:function(){return React.createElement("li",{className:"product"},React.createElement("a",{href:"#"},React.createElement("img",{alt:"",src:this.props.image}),React.createElement("h4",{className:"sr-only"},this.props.name),React.createElement("span",{className:"sr-only"},this.props.desc),React.createElement("span",{className:"product__extra"},this.props.extra)))}}),ProductSection=React.createClass({displayName:"ProductSection",render:function(){var e=[],t=this.props.category,a="product-section "+this.props.slug;return this.props.products.forEach(function(a){a.category===t&&e.push(React.createElement(ProductListItem,{image:a.image,name:a.name,desc:a.desc,extra:a.extra,key:a.name}))}),React.createElement("section",{className:a},React.createElement("div",{className:"wrapper"},React.createElement("h3",null,this.props.category),React.createElement("ul",{className:"product-list"},e)))}}),ProductSections=React.createClass({displayName:"ProductSections",render:function(){var e=[],t=null;return this.props.products.forEach(function(a){a.category!==t&&e.push(React.createElement(ProductSection,{products:BEERS,category:a.category,slug:a.categorySlug,key:a.category})),t=a.category}),React.createElement("div",{className:"products"},React.createElement("h2",{className:"sr-only"},"Products"),e)}}),Content=React.createClass({displayName:"Content",render:function(){return React.createElement("div",null,React.createElement(Carousel,{slides:SLIDES}),React.createElement(ProductNav,{products:BEERS}),React.createElement(ProductSections,{products:BEERS}))}});ReactDOM.render(React.createElement(Content,null),document.getElementById("content"));