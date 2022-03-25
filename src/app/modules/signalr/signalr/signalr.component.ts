import { Component, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.scss']
})
export class SignalRComponent implements OnInit {

  private connection: HubConnection;
  perfilEnum = {
    treinador: 1,
    jogador: 2
  }
  perfilAtual = 0;
  jogoAtual = 0;
  jogos = [1, 2, 3, 4];

  constructor(public dialog: MatDialog) {
    this.connection = this.getConnection();
  }

  ngOnInit() {
  }

  getConnection() {
    let connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44354/gameHub", { skipNegotiation: true, transport: HttpTransportType.WebSockets })
      .build();

    connection.start().catch(err => console.error(err));
    return connection;
  }

  iniciarJogo(jogo: number) {
    this.jogoAtual = jogo;
    this.connection.invoke("EntrarJogo", jogo).then(result => {
      this.connection.on(`jogadaFinalizada`, data => this.onJogadaFinalizada(data));
    }).catch(function (err) {
      return console.error(err);
    });
  }

  onJogadaFinalizada(data: any): void {
    this.dialog.open(FinalizarJogadaComponent)
      .afterClosed().subscribe(result => {
        this.connection.invoke("SairJogo", this.jogoAtual).then(_ => {
          this.connection.off(`jogadaFinalizada`);
          this.jogoAtual = 0;
        }).catch(function (err) {
          return console.error(err);
        });
      });
  }

  finalizarJogo(jogo: number) {
    this.connection.invoke("FinalizarJogada", jogo).catch(function (err) {
      return console.error(err);
    });
  }
}

@Component({
  templateUrl: './finalizar-jogada.component.html'
})
export class FinalizarJogadaComponent {
  constructor(public dialogRef: MatDialogRef<FinalizarJogadaComponent>) { }

  ok() {
    this.dialogRef.close();
  }
}