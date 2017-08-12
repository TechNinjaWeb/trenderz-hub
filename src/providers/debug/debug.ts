import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DomInjectableService } from './../dom-injectable-service/dom-injectable-service';
import { AlertController } from 'ionic-angular';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

function safeStringify(item) {
  let i;
  try{
    if ( typeof item !== 'string') i = JSON.stringify(item);
    else i = item;
  }
  catch (err){i = item.toString()}
  return i;
}

function processArgs(args) {
  var cleaned = {
    orig: args,
    clean: null
  };

  if (Array.isArray(args) === true) cleaned.clean = args
      .map(item=>{ 
        if( typeof item === 'object' && !Array.isArray( item ) ) return safeStringify(item); 
        if ( typeof item === 'object' && Array.isArray( item ) ) 
          if ( typeof item[0] === 'object' ) return safeStringify(item);
          else return item;
        return item;  // Final return if all else fails
      });
  else cleaned.clean = args;
  return cleaned;
}

@Injectable()
export class DebugProvider {

  private consoleEnabled: boolean = false;
  private loggerEnabled: boolean = false;

  constructor(
    public dom: DomInjectableService,
    public toastr: ToastsManager
  ) {
    this.dom.link('DebugProvider', this);
  }

  private TryToLog(args: any[], service: string) {
    // Map the arguments with stringified objects
    let a = processArgs(args);

    // Determine which service to log the message to
    if ( this.loggerEnabled && service !== 'log') this.toastr[ service ].bind(this.toastr)(a.clean);
    if ( this.consoleEnabled ) this.console(service === 'log' ? 'log' : 'warn', a);
  }

  public ConsoleEnabled(enabled: boolean) { 
    // Bind the console to the log function
    // https://stackoverflow.com/questions/28668759/what-does-this-statement-do-console-log-bindconsole
    this.consoleEnabled = enabled; 
  }

  public LoggerEnabled(enabled: boolean) { this.loggerEnabled = enabled; }

  public console(service: string, a:{orig: Array<any>, clean: Array<any>}): void {
    // Determine which service to log the message to
    if (service.toLowerCase() === 'log')
      try { console.log.apply(undefined, a.orig); }
      catch(err) { console.log(a.orig); }
    if (service.toLowerCase() === 'warning')
      try { console.warn.apply(undefined, a.orig); }
      catch(err) { console.warn(a.orig); }
  }

  public log(...args: any[]) {
    // Determine which service to log the message to
    this.TryToLog(args, 'log');
  }

  public warn(...args: any[]) {
    // Determine which service to log the message to
    this.TryToLog(args, 'warning');
  }

  public success(...args: any[]): void {
    // Determine which service to log the message to
    this.TryToLog(args, 'success');
  }

  public error(...args: any[]): void {
    // Determine which service to log the message to
    this.TryToLog(args, 'error');
  }

  public warning(...args: any[]): void {
    // Determine which service to log the message to
    this.TryToLog(args, 'warning');
  }

  public info(...args: any[]): void {
    // Determine which service to log the message to
    this.TryToLog(args, 'info');
  }
  
  public custom(...args: any[]): void {
    // Determine which service to log the message to
    this.TryToLog(args, 'custom');
  }
  

}