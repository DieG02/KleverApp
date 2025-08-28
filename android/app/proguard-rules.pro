# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:


### Based on package.json, set the following rules ###


# -------------------------------
# React Native core
# -------------------------------
-keep class com.facebook.react.** { *; }
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# -------------------------------
# Hermes (if using Hermes engine)
# -------------------------------
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# -------------------------------
# Firebase - Auth / Firestore / Functions
# -------------------------------
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# Keep model classes if you use Firestore/RealtimeDB objects
-keepclassmembers class * {
    @com.google.firebase.database.PropertyName <fields>;
}
-keepclassmembers class * {
    @com.google.firebase.firestore.PropertyName <fields>;
}

# Keep Firebase Functions invocation classes
-keep class com.google.firebase.functions.** { *; }

# -------------------------------
# Google Sign-In
# -------------------------------
-keep class com.google.android.gms.auth.api.signin.** { *; }
-keep class com.google.android.gms.common.** { *; }

# -------------------------------
# Optional: AsyncStorage / Voice / other native modules
# -------------------------------
-keep class com.reactnativecommunity.asyncstorage.** { *; }
-keep class com.wenkesj.voice.** { *; }

# -------------------------------
# Prevent stripping annotations used by Firebase & GSON
# -------------------------------
-keepattributes Signature
-keepattributes *Annotation*

# -------------------------------
# Prevent stripping enums used in Firebase
# -------------------------------
-keepclassmembers enum * { *; }

# -------------------------------
# Keep anything annotated with @Keep (common in RN libraries)
# -------------------------------
-keep @androidx.annotation.Keep class * { *; }
