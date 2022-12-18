import {openDatabase, enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';

const dbFileName = 'lessons_2022_12_17.db'
const tableName = 'Lessons_Main1'

enablePromise(true)

export type LessonMetadata = {
  lessonNumber: number,
  itemOrderDefault: number,
  lessonTitle: string,
  englishText: string, 
  sentenceCount: string | null,
  averageTime: string | null,
  lessonNotes: string | null,
  englishAudioFile: string,
  missingEnglishExercise: string | null,
  spanishText: string,
  spanishAudioFile: string,
  frenchText: string,
  frenchAudioFile: string,
  koreanText: string,
  koreanAudioFile: string,
}

export const getDBConnection = async () => {
  return openDatabase({ name: dbFileName, createFromLocation: 1 });
};

const getLessonTitlesQuery = `SELECT lesson_number as \'lessonNumber\', item_order_default as \'itemOrderDefault\',lesson_title as \'lessonTitle\', english_text as \'englishText\', sentences as \'sentenceCount\', avg_time as \'averageTime\', lesson_notes as \'lessonNotes\', english_audio_file_100 as \'englishAudioFile\', english_exercise_missing as \'missingEnglishExercise\', spanish_text as \'spanishText\', spanish_audio_file_70 as \'spanishAudioFile\', french_text as \'frenchText\', french_audio_file_70 as \'frenchAudioFile\', korean_text as \'koreanText\', korean_audio_file_70 as \'koreanAudioFile\' FROM \'${tableName}\' WHERE item_order_default = 0;`

export const getLessonTitles = async (db: SQLiteDatabase): Promise<LessonMetadata[]> => {
  try {
    const lessonMetadataItems: LessonMetadata[] = [];
    const results = await db.executeSql(getLessonTitlesQuery);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        lessonMetadataItems.push(result.rows.item(index))
      }
    });
    return lessonMetadataItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get lesson metadata!!!');
  }
};