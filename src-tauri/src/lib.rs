use tauri_plugin_dialog::DialogExt;

// Command to open a file dialog and return the selected path
#[tauri::command]
async fn open_file_dialog(app_handle: tauri::AppHandle) -> Result<String, String> {
    // Use the proper dialog API from the plugin
    let file_path = app_handle
        .dialog()
        .file()
        .add_filter("All Files", &["*"])
        .blocking_pick_file();
    
    match file_path {
        Some(path) => Ok(path.to_string()),
        None => Err("No file selected".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_file_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
