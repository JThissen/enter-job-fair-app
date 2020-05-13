import { ElementRef } from '@angular/core';

export class Utilities 
{
    public static highlight_word(word: string, color: string, variable: string, target: ElementRef) : void
    {
        if(!variable.includes(word))
            return
        else
        {
            target.nativeElement.innerHTML = variable.substring(0, variable.indexOf(word))
            + `<span style="color: ${color}">${word}</span>`
            + variable.substring(variable.indexOf(word) + word.length, variable.length);
        }
    }
}
