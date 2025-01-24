import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
    selector: "keo-whatsapp-chat",
    templateUrl: "./keo-whatsapp-chat.component.html",
    styleUrls: ["./keo-whatsapp-chat.component.scss"],
    standalone: true,
    imports: [NgClass, FormsModule]
})
export class KeoWhatsappChatComponent {
    showChat: boolean = false;

    @Input('kwcStatic') kwcStatic: boolean = false;
    
    @Input('kwcTitle') title: string = "Iniciar conversación";
    @Input('kwcSubtitle') subtitle: string = "¡Hola! ¿Necesitas ayuda? comunicate con nosotros a traves de WhatsApp.";
    @Input('kwcTextHelp') textHelp: string = "El equipo suele responder en unos minutos.";
    @Input('kwcTextButton') textButton: string = "Enviar";

    @Input('kwcFirstColor') kwcFirstColor: string = "#2db742";
    @Input('kwcSecondColor') kwcSecondColor: string = "#f7f7f7";
    
    @Input('kwcPhone') phone: string | null = null;

    link: string = "https://wa.me/";
    message: string = "";

    cleam() {
        this.showChat = false;
        this.message = "";
    }
}