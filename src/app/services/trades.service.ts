import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'https://backend-897yaasz1-a4ameens-projects.vercel.app/api/trades'; // Backend API URL

  constructor(private http: HttpClient, private authService: PlayerService) { }

  // Fetch all trades


  // Add a new trade
  addTrade(tradeData: FormData): Observable<any> {
    console.log("service FormData:", tradeData);

    return this.http.post(`${this.apiUrl}/addTrade`, tradeData, {
      headers: new HttpHeaders({
        // Remove Content-Type header to let browser set it automatically for FormData
        'Accept': 'application/json'
      })
    });
  }


  // Remove a trade
  deleteTrade(tradeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete${tradeId}`);
  }

  toggleTradeStock(id: string, stockData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/toggle-stock/${id}`, stockData);
  }

  getTrades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trades`);
  }

  // Add to trade.service.ts
  getUserTrades(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/player-trades/${userId}`);
  }

  cancelTrade(tradeId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cancel-trade/${tradeId}`, {});
  }

  // trade.service.ts
  createPlayerTrade(tradeDetails: any): Observable<any> {
    const user = this.authService.getUser();
    const payload = {
      ...tradeDetails,
      playerId: user._id
    };
    console.log("payload", payload);

    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  getTradeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllPlayerTrades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trading`);  // Remove '/trades' from the path
  }


  updateTradeStatus(tradeId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/status/${tradeId}`, { status });
  }

  updateTrade(id: string, tradeData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, tradeData);
  }

}
