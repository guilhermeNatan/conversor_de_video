import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import '../../frontend/node_modules/video-react/dist/video-react.css';
import axios from 'axios';
import {BASE_URL} from "./constants/Constantes";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formatoDeSaida: "",
            filename: "",
            output: {},
            showPainelConvert: false,
            fileDisponivelInS3: null,


        }
    }

    handleChange = event => {
        this.setState({formatoDeSaida: event.target.value});
    };
    arquivoDisponivel = (url) => {
        try {
            axios.get(url)
                .then(() => {
                    this.setState({fileDisponivelInS3: true})
                    window.open(url)
                }).catch((e) => {
                e.message === "Network Error" ?
                    window.open(url) :
                    this.setState({fileDisponivelInS3: false})
            })
        } catch (e) {
            console.log('error', e);
            this.setState({fileDisponivelInS3: false})
        }
    }


    convertVideo = () => {
        axios.post(`${BASE_URL}/transcoding`, {
            filename: this.state.filename,
            formatoDeSaida: this.state.formatoDeSaida,
        }).then(response => {
            console.log('resposta.data', response.data);
            this.setState({output: response.data});
            return response.data.outputs[0].url;
        })
    }

    render() {
        return (
            <div className="App" >
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Bem vindo ao conversor de arquivos</h1>
                </header>


                <div style={{textAlign: 'left', margin: '4%'}}>
                    <h3>Instruções: </h3>
                    <ul>
                        <li>Faça o upload do arquivo, clicando ou arrasto um arquivo de video na area indicada logo abaixo</li>
                        <li>Assim o upload do arquivo for concluido será exibido um campo para a escolha do formato de saída.
                        Basta escolher o formato e clicar em Converter</li>
                        <li>Quando a conversão estiver concluída, basta clicar no botão 'Visualizar o video convertido'</li>
                        <li>
                            OBS: em alguns casos após clicar no comando 'Visualizar o video convertido' pode ser
                            que seja redirecionado para uma página xml de Access Denied basta esperar alguns segundos e dar um refresh na página que o video será
                            exibido.
                        </li>

                    </ul>

                </div>
                <div style={{margin: '5%'}}>
                    <FileUpload
                        label="Faça o upload de um arquivo"
                        maxFiles={1}
                        required
                        eventHandlers={{
                            success: (file, response, error) => this.setState({
                                filename: response.fileNameOnS3,
                                showPainelConvert: true
                            })
                        }}
                        onChange={(o) => console.log('o', o)}
                    />
                </div>

                {
                    this.state.showPainelConvert &&
                    <div style={{marginBottom: '5%'}}>
                        <InputLabel htmlFor="optionsConvert">Escolha um formato de conversão</InputLabel>
                        <Select
                            native
                            value={this.state.formatoDeSaida}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'optionsConvert',
                            }}
                        >
                            <option value=""/>
                            <option value="MP4">MP4</option>
                            <option value="WebM">WebM</option>
                            <option value="OGG">OGG</option>
                            <option value="VP8">VP8</option>
                            <option value="VP9">VP9</option>
                            <option value="Theora">Theora</option>

                        </Select>

                        <Button variant="contained" color="primary"
                                onClick={this.convertVideo}>
                            Converter
                        </Button>

                        {
                            this.state.output.outputs &&
                            <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '4%'}}>
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            this.arquivoDisponivel(this.state.output.outputs[0].url)
                                        }}>
                                    Visualizar o video convertido
                                </Button>
                            </div>
                        }

                        {
                            this.state.fileDisponivelInS3 === false &&
                            <div>
                                Aguarde um momento...
                            </div>
                        }

                    </div>
                }


            </div>
        );
    }
}

export default App;
