use chrono::Local;

// Command that returns the current OS time
#[tauri::command]
fn ping() -> String {
    let current_time = Local::now();
    format!("{}", current_time.format("%Y-%m-%d %H:%M:%S"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![ping])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
