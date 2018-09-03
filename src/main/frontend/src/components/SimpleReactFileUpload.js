import React from 'react';
import './css/filepicker.css';
import './css/dropzone.css';
import { SimpleReactDropzone } from 'simple-react-dropzone';
import { DragAndClickMessage } from './DragAndClickMessage';

export const SimpleReactFileUpload = (props) => {
  const defaultMaxFilesize = 10;

  const djsConfig = {
    dictFileTooBig: 'O arquivo é muito grande. Tamanho máximo pemitido:' +
    ' {{maxFilesize}} MB.',
    filesizeBase: 1024,
  };
  /**
   * Mapeia os erros em mensagens.
   * @param erro
   * @returns {*}
   */
  const formataMensagem = (erro) => {
    if (erro.codigo === 'tamanhoTexto' && erro.propriedade === 'nomeProprio') {
      return `Não foi possível executar a ação, pois o nome do arquivo excede 50 caracteres. 
Renomeie o arquivo (ou selecione outro arquivo) e tente novamente.`;
    }
    return erro.mensagem;
  };

  /**
   * Exibe uma mensagem de erro quando o servidor retorna um erro no upload
   * @param file arquivo enviado
   * @param msg objeto recebido como resposta do servidor
   */
  const exibeMensagemExcecaoValidacao = (file, msg) => {
    if (msg && msg.erros) {
      this.emit('error', file, formataMensagem(msg.erros[0]));
    }
  };
  return (<SimpleReactDropzone
    label={props.label}
    disableAddActions={props.readOnly}
    hideDeleteActions={props.readOnly}
    required={props.required}
    config={props.config}
    eventHandlers={{ error: exibeMensagemExcecaoValidacao }}
    djsConfig={djsConfig}
    uploadUrl={props.url}
    imediateRemove={false}
    maxFilesize={props.maxFilesize || defaultMaxFilesize}
    dragAndClickMessage={
      <div>
        <DragAndClickMessage
          quantidadeArquivos={props.maxFiles}
          tamanhhoMaximoDeArquivo={props.maxFilesize || defaultMaxFilesize}
        />
      </div>
    }
    {...props}
  />
  );
};
