import React from 'react';

const styles = {
  principal: {
    display: 'grid',
    marginTop: -8,
  },
  icon: {
    color: '#777',
  },
  mensagens: {
    fontSize: '0.9em',
  },
  ultimaMensagem: {
    margin: '6px 10px -6px',
  },
};


export const DragAndClickMessage = ({ quantidadeArquivos, tamanhhoMaximoDeArquivo }) => {
  const mensagem =
    // eslint-disable-next-line eqeqeq
    (quantidadeArquivos == 1) ? (
      <div>
        Você pode enviar <b>{quantidadeArquivos} arquivo</b> soltando-o aqui
        ou clicando aqui para selecioná-lo.
      </div>
    ) : (
      <div>
        Você pode enviar até <b>{quantidadeArquivos} arquivos</b> soltando-os aqui
        ou clicando aqui para selecioná-los.
      </div>
    );

  return (
    <div style={styles.principal}>
      <div style={styles.mensagens}>
        {mensagem}
        <div style={styles.ultimaMensagem}>
          O tamanho <b>máximo</b> permitido para cada arquivo é
          de <b>{tamanhhoMaximoDeArquivo} MB</b>.
        </div>
      </div>
    </div>
  );
};
