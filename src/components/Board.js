import React, { Component } from 'react'
import Square from "./Square"



export default class Board extends Component {
    renderCuadro(i){
        return <Square value={this.props.cuadros[i]}
        onClick={()=> this.props.onClick(i)}
        />
    }
    render() {
        return (
            <div>
                <div>
                    {this.renderCuadro(0)}
                    {this.renderCuadro(1)}
                    {this.renderCuadro(2)}
                </div>
                <div>
                    {this.renderCuadro(3)}
                    {this.renderCuadro(4)}
                    {this.renderCuadro(5)}
                </div>
                <div>
                    {this.renderCuadro(6)}
                    {this.renderCuadro(7)}
                    {this.renderCuadro(8)}
                </div>
                
            </div>
        )
    }
}
