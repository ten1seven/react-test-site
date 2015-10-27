/*
  --------------------
  carousel
  --------------------
*/

function Slide(props) {
  return (<img alt="" src={props.image} />);
}

var Carousel = React.createClass({
  render: function() {
    var slides = this.props.slides.map(function(slide) {
      return (<Slide image={slide.image} key={slide.name} />);
    });

    return (
      <section className="carousel">
        {slides}
      </section>
    );
  }
});


/*
  --------------------
  products
  --------------------
*/

/*
  product navigation
*/

var ProductNavButton = React.createClass({
  render: function() {
    var className = "page-nav__button";
    if (this.props.selected) className += " -selected";

    return (
      <li>
        <button className={className} data-index={this.props.dataIndex} key={this.props.dataIndex} onClick={this.props.clickHandler}>{this.props.category}</button>
      </li>
    );
  }
});

var ProductNav = React.createClass({
  render: function() {
    var links = [];

    for (var i = 0; i < this.props.data.length; i++) {
      var product = this.props.data[i];

      links.push(<ProductNavButton key={i} category={product.category} clickHandler={product.clickHandler} dataIndex={product.dataIndex} selected={product.selected} />);
    }

    return (
      <nav className="page-nav">
        <div className="wrapper">
          <h2 className="sr-only">Page Navigation</h2>
          <ul>{links}</ul>
        </div>
      </nav>
    );
  }
});


/*
  product display
*/

var ProductListItem = React.createClass({
  showProduct: function(event) {
    event.preventDefault();

    alert(this.props.data.name + ' ' + this.props.data.desc);
  },

  render: function() {
    var result = this.props.data;

    return (
      <li className="product">
        <a href="#" onClick={this.showProduct}>
          <img alt="" src={result.image} height="300" width="300" />
          <h4 className="sr-only">{result.name}</h4>
          <span className="sr-only">{result.desc}</span>
          <span className="product__extra">{result.extra}</span>
        </a>
      </li>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <h3>{this.props.category}</h3>
        <ul className="product-list">
          {this.props.data.map(function(result) {
            return <ProductListItem key={result.id} data={result} />;
          })}
        </ul>
      </div>
    );
  }
});


/*
  products component
*/

var Products = React.createClass({
  getInitialState: function() {
    return {
      selectedIndex: 0
    }
  },

  productSwitcher: function(event) {
    this.setState({
      selectedIndex: parseInt(event.target.getAttribute('data-index'), 10)
    });
  },

  categoryName: function() {
    return this.props.products[this.state.selectedIndex].category;
  },

  categoryList: function() {
    var links = [];
    var lastCategory = null;
    var productList = this.props.products;

    for (var i = 0; i < productList.length; i++) {
      var product = productList[i];

      if (product.category !== lastCategory) {
        links.push({
          'category': product.category,
          'clickHandler': this.productSwitcher,
          'dataIndex': i,
          'selected': (this.state.selectedIndex === i) ? true : false,
        });
      }

      lastCategory = product.category;
    }

    return links;
  },

  productList: function() {
    var productArray = [];
    var products = this.props.products;
    var categorySlug = products[this.state.selectedIndex].categorySlug;

    for (var i = 0; i < products.length; i++) {
      var product = products[i];

      if (product.categorySlug === categorySlug) {
        productArray.push({
          'category': product.category,
          'desc': product.desc,
          'extra': product.extra,
          'id': i,
          'image': product.image,
          'name': product.name,
        });
      }
    }

    return productArray;
  },

  render: function() {
    return (
      <div>
        <ProductNav data={this.categoryList()} />
        <section className="product-section">
          <ProductList category={this.categoryName()} data={this.productList()} />
        </section>
      </div>
    );
  }
});


/*
  --------------------
  render
  --------------------
*/

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <Carousel slides={SLIDES} />
        <Products products={BEERS} />
      </div>
    );
  }
});

ReactDOM.render(
  <Content />,
  document.getElementById('content')
);
