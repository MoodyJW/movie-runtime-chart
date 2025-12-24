import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  title: string;
  year: number;
  runtime: number; // in minutes
}

export interface YearlyAverage {
  name: string;
  value: number; // average runtime in minutes
}

@Injectable({
  providedIn: 'root',
})
export class MovieData {
  
  /**
   * Mock data representing top 100 movies by year with their runtimes.
   * In a real application, this would fetch from an IMDB API.
   * Data represents realistic average runtimes for major American films.
   */
  private mockMovieData: Movie[] = [
    // 2020 - Action/Drama heavy year
    ...this.generateMoviesForYear(2020, 142, 100),
    // 2021 - Streaming boom, mix of lengths
    ...this.generateMoviesForYear(2021, 138, 100),
    // 2022 - Return to theaters, longer epics
    ...this.generateMoviesForYear(2022, 145, 100),
    // 2023 - Blockbuster year
    ...this.generateMoviesForYear(2023, 148, 100),
    // 2024 - Current year
    ...this.generateMoviesForYear(2024, 146, 100),
  ];

  /**
   * Generates mock movie data for a specific year
   */
  private generateMoviesForYear(year: number, avgRuntime: number, count: number): Movie[] {
    const movies: Movie[] = [];
    for (let i = 0; i < count; i++) {
      // Add variation to runtime (±20 minutes)
      const variation = (Math.random() - 0.5) * 40;
      movies.push({
        title: `Movie ${i + 1} of ${year}`,
        year: year,
        runtime: Math.round(avgRuntime + variation)
      });
    }
    return movies;
  }

  /**
   * Gets all movie data
   */
  getMovies(): Observable<Movie[]> {
    return of(this.mockMovieData);
  }

  /**
   * Calculates average runtime by year for chart display
   */
  getAverageRuntimeByYear(): Observable<YearlyAverage[]> {
    const yearGroups = new Map<number, number[]>();
    
    // Group runtimes by year
    this.mockMovieData.forEach(movie => {
      if (!yearGroups.has(movie.year)) {
        yearGroups.set(movie.year, []);
      }
      yearGroups.get(movie.year)!.push(movie.runtime);
    });

    // Calculate averages
    const averages: YearlyAverage[] = [];
    yearGroups.forEach((runtimes, year) => {
      const avg = runtimes.reduce((sum, runtime) => sum + runtime, 0) / runtimes.length;
      averages.push({
        name: year.toString(),
        value: Math.round(avg)
      });
    });

    // Sort by year
    averages.sort((a, b) => parseInt(a.name) - parseInt(b.name));

    return of(averages);
  }
}
