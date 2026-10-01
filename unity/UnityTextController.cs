using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class UnityTextController : MonoBehaviour
{
    [Header("Vercel")]
    [Tooltip("Example: https://your-project.vercel.app/api/get-text")]
    public string apiUrl = "https://YOUR-PROJECT.vercel.app/api/get-text";

    [Header("Unity UI")]
    [Tooltip("Drag your TextMeshProUGUI object here.")]
    public TMP_Text targetText;

    [Header("Polling")]
    [Min(0.25f)]
    public float pollEverySeconds = 1f;

    private string lastText;
    private Coroutine pollingCoroutine;

    private void Start()
    {
        pollingCoroutine = StartCoroutine(PollLoop());
    }

    private IEnumerator PollLoop()
    {
        while (true)
        {
            yield return GetLatestText();
            yield return new WaitForSeconds(pollEverySeconds);
        }
    }

    private IEnumerator GetLatestText()
    {
        if (string.IsNullOrWhiteSpace(apiUrl) || apiUrl.Contains("YOUR-PROJECT"))
        {
            Debug.LogWarning("UnityTextController: Set apiUrl to your deployed Vercel /api/get-text URL.");
            yield break;
        }

        using (UnityWebRequest request = UnityWebRequest.Get(apiUrl))
        {
            request.SetRequestHeader("Cache-Control", "no-cache, no-store");
            request.timeout = 10;

            yield return request.SendWebRequest();

            if (request.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning("UnityTextController request failed: " + request.error);
                yield break;
            }

            try
            {
                TextResponse response =
                    JsonUtility.FromJson<TextResponse>(request.downloadHandler.text);

                if (response == null)
                {
                    Debug.LogWarning("UnityTextController: Empty JSON response.");
                    yield break;
                }

                if (response.text != lastText)
                {
                    lastText = response.text ?? "";

                    if (targetText != null)
                    {
                        targetText.text = lastText;
                    }
                    else
                    {
                        Debug.LogWarning("UnityTextController: Target Text is not assigned.");
                    }
                }
            }
            catch (Exception exception)
            {
                Debug.LogWarning("UnityTextController JSON error: " + exception.Message);
            }
        }
    }

    [Serializable]
    private class TextResponse
    {
        public int id;
        public string text;
        public string updated_at;
    }
}