import React, { Component } from 'react';

class Infos extends Component {
  render() {
    return (<p className="info-content">
      Clique e/ou segure nas setas para programar o tempo,<br />
      ou digite separando os valores com qualquer caractere.<br />
      <b>(Ex: "0:1:25", "03/21/5", "5 43 15", "02h3m57s")</b>
    </p>);
  }
}

export default Infos;